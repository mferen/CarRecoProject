const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
let instance = null;

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

con.connect((error) => {
    if (error) throw error;
    console.log("Connected.");
});

class Db {
    static getDbInst() {
        return instance ? instance : new Db();
    }
    async getData() {
        try {
            const response = await new Promise((resolve, reject) => {
                con.query("SELECT * FROM cars", (err, result) => {
                    if (err) reject(new Error(err.mesage));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            throw error;
        };
    };

    async searchData(car_brand, car_model, car_year) {
        try {
            const response = await new Promise((resolve, reject) => {
                con.query("SELECT * FROM cars WHERE car_brand = ? AND car_model = ? AND car_year = ?", [car_brand, car_model, car_year], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            throw error;
        };
    };
    async addData(car_brand, car_model, car_year){



      try {
        const response = await new Promise((resolve, reject) => {
          let sql = "INSERT INTO cars (car_brand, car_model, car_year) VALUES (?,?, ?)";
          con.query(sql,[car_brand, car_model,car_year], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          });
        });
        return response;
      } catch (error) {
        throw error;
      };
    };




  async updateData(car_brand, car_model, car_year,id){



    try {
      const response = await new Promise((resolve, reject) => {
        let sql = "UPDATE cars SET  car_brand = ?, car_model = ?, car_year = ?  WHERE id =?";
        con.query(sql,[car_brand, car_model,car_year,id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      throw error;
    };
  };




  async deleteData(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        con.query("DELETE FROM cars WHERE id=?", [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      throw error;
    };
  };

}

module.exports = Db;
