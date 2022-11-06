require("module-alias/register");
require('dotenv').config();

let mysql = require('mysql');
let dbInst;

const initMySQLClient = async () => {
  return new Promise((resolve, reject) => {
    let con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME
    });
    con.connect(function(err) {
      if (err) {
        console.log("connect to MySQL failed with error", err);
        reject(err);
      } {
        dbInst = con;
        resolve();
      }
    });
  });
};

const getMySQLInst = async () => {
  if (dbInst) return dbInst;

  await initMySQLClient();
  return dbInst;
};

const doQuerying = async (query) => {
  return new Promise(async (resolve, reject) => {
    const con = await getMySQLInst();

    con.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

exports.initMySQLClient = initMySQLClient;
exports.getMySQLInst = getMySQLInst;
exports.doQuerying = doQuerying;