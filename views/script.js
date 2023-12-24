document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/get")
        .then(res => res.json())
        .then(data => console.log(data));
    loadHTMLTable([]);
});











/* const text1 = document.getElementById("brandId");
const text2 = document.getElementById("modelId");
const text3 = document.getElementById("yearId");

document.getElementById("search").addEventListener("click", function() {
    document.getElementById("demo").innerHTML = text1.value + " " + text2.value + " " + text3.value;
}) */