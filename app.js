const express = require('express');
const morgan = require("morgan");

const cors = require("cors");
const database = require("./database");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("views"));

app.set("view engine", "ejs");
app.listen(3000);
app.use(morgan("dev"));


app.get("/get", (req, res) => {
    const db = database.getDbInst();
    const result = db.getData();
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.get("/search/:car_brand/:car_model/:car_year", (req, res) => {
    const { car_brand } = req.params;
    const { car_model } = req.params;
    const { car_year } = req.params;
    const db = database.getDbInst();
    const result = db.searchData(car_brand, car_model, car_year);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

app.get("/", (req, res) => {
    res.render("index", { title: "Search" });
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});