const mysql = require('mysql2');
const createConnection = (host, port, db, user, password) => {
    const connection = mysql.createConnection({
        host: String(host),
        database: String(db),
        port: Number(port),
        user: String(user),
        password: String(password)
    });
    connection.connect(err => {
        if(err) throw err;
        console.log('Successfully connected to the database');
    })
}

module.exports = { createConnection }