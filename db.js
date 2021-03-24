const mysql = require('mysql');

const db = mysql.createConnection ({
    host: 'db-mysql-tor1-ip-do-user-8577088-0.b.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'lfnhput3mb78mxgw',
    port: '25060',
    database: 'individualquizapp'
});


// connect to database
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query("CREATE DATABASE IF NOT EXISTS individualquizapp", function (err, result) {
      if (err) throw err;
    console.log("Database created");
    });
  });
  
module.exports = db;