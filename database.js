const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

con.connect((error) => {
    if (error) throw error;
    console.log("Connected.");

    con.query("select * from cars", (err, result) => {
        if (error) throw error;
        console.log(result);
    });

});