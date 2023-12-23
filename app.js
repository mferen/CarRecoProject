const express = require('express');
const morgan = require("morgan");
const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sezer123",
    database: "carreco"
});

con.connect((error) => {
    if (error) throw error;
    console.log("Connected.");

    con.query("select * from cars", (err, result) => {
        if (error) throw error;
        console.log(result);
    });

});


const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("index", { title: "Search" });
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});