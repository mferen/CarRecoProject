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


  const deletebtn =document.getElementsByClassName('.deletetbl')
/*deletebtn.onclick = function (){
  deletebtn.addEventListener("click", function (e){
    alert("test");
   const deleteBrand = document.querySelector("#brandId").value;
   const deleteModel = document.querySelector("#modelId").value;
   const deleteYear = document.querySelector("#yearId").value;


  fetch("http://localhost:3000/delete/" + deleteBrand + "/" + deleteModel + "/" + deleteYear)
    .then(response => response.json())
    .then(data => loadIndexTable(data["data"]));

});
};*/


  function loadIndexTable(data) {
    const table = document.querySelector("#table");
    console.log(data);
    const arr = Array.from(data);
    let tableDetails = "";
    tableDetails += "<thead>";
    tableDetails += "<tr>";
    tableDetails += "<th scope='col'>ID</th>";
    tableDetails += "<th scope='col'>BRAND</th>";
    tableDetails += "<th scope='col'>MODEL</th>";
    tableDetails += "<th scope='col'>YEAR</th>";
    tableDetails += "<th scope='col'>ACTIONS</th>";
    tableDetails += "</tr>";
    tableDetails += "</thead>";

    arr.forEach(({id, car_brand, car_model, car_year}) => {

      tableDetails += "<tbody>";
      tableDetails += `<td scope='col'>${id}</td>`;
      tableDetails += `<td scope='col'>${car_brand}</td>`;
      tableDetails += `<td scope='col'>${car_model}</td>`;
      tableDetails += `<td class="deletetbl" scope='col'>${car_year}</td>`;
      tableDetails += `<td scope='col'><button onclick="removefnc(${id})" type="button" class="btn btn-success deletetbl" style="float: right">Delete</button></td>`;
      tableDetails += "</tbody>";

    })


    table.innerHTML = tableDetails;



  }

  function removefnc(id) {



    fetch("http://localhost:3000/delete/"+id, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }



    })
      .then(response => response.json())

  };


