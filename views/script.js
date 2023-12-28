document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/get")
        .then(res => res.json())
        .then(data => loadIndexTable(data["data"]));


});

const searchBtn = document.querySelector("#search");

searchBtn.onclick = function() {
    const searchBrand = document.querySelector("#brandId").value;
    const searchModel = document.querySelector("#modelId").value;
    const searchYear = document.querySelector("#yearId").value;
    fetch("http://localhost:3000/search/" + searchBrand + "/" + searchModel + "/" + searchYear)
        .then(response => response.json())
        .then(data => loadIndexTable(data["data"]));


}

function loadIndexTable(data) {
    const table = document.querySelector("#table");
    console.log(data);
    const arr = Array.from(data);
    let tableDetails = "";

    arr.forEach(({ car_id, car_brand, car_model, car_year }) => {
        tableDetails += "<tr>";
        tableDetails += `<th scope='col'>${car_id}</th>`;
        tableDetails += `<th scope='col'>${car_brand}</th>`;
        tableDetails += `<th scope='col'>${car_model}</th>`;
        tableDetails += `<th scope='col'>${car_year}</th>`;
        tableDetails += "</tr>";
    })

    table.innerHTML = tableDetails;
}