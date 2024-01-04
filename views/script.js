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
      tableDetails += `<td scope='col'><button onclick="removefnc(${id})" type="button" class="btn btn-success deletetbl" style="background-color: darkslateblue" >Delete</button> <button onclick="updatefnc(${id})" type="button" class="btn btn-success text-center" style="background-color: orange" id="update">Update</button></td>`;
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

 function updatefnc(id) {

    const updatebtn = document.querySelector("#update");
    updatebtn.onclick()
    {
      const updateBrand = document.querySelector("#brandId").value;
      const updateModel = document.querySelector("#modelId").value;
      const updateYear = document.querySelector("#yearId").value;


      fetch("http://localhost:3000/update/" + id, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          car_brand: updateBrand,
          car_model: updateModel,
          car_year: updateYear
        })
      })
        .then(response => response.json())

    }
 }



