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
const addBtn = document.querySelector("#add");
addBtn.onclick = function() {
  const addBrand = document.querySelector("#brandId").value;
  const addModel = document.querySelector("#modelId").value;
  const addYear = document.querySelector("#yearId").value;
  fetch("http://localhost:3000/create/", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      car_brand: addBrand,
      car_model: addModel,
      car_year: addYear
    })
  })
    .then(response => response.json())

}


function loadIndexTable(data) {
    const table = document.querySelector("#table");
    console.log(data);
    const arr = Array.from(data);
    let tableDetails = "";

    arr.forEach(({ id, car_brand, car_model, car_year }) => {
        tableDetails += "<tr>";
        tableDetails += `<th scope='col'>${id}</th>`;
        tableDetails += `<th scope='col'>${car_brand}</th>`;
        tableDetails += `<th scope='col'>${car_model}</th>`;
        tableDetails += `<th scope='col'>${car_year}</th>`;
        tableDetails += "</tr>";
    })

    table.innerHTML = tableDetails;
}
