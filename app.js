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
    res.json({
        success: true
    })
});

app.get("/", (req, res) => {
    res.render("index", { title: "Search" });
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});