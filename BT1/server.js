require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createConnection } = require('./configs/db.config');
//routes
const { todosRoutes } = require('./routes/todos');
const { usersRoutes } = require('./routes/users');
const { notificationRoutes } = require('./routes/notification');
//server
const host = process.env.HOST;
const port = process.env.PORT;
const server = express();

//db
const db_host = process.env.MYSQL_HOST;
const db_port = process.env.MYSQL_PORT;
const db = process.env.MYSQL_DB;
const user = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;

try {
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }))
    server.use(bodyParser.json());
    server.use('/api/v1/todos', todosRoutes);
    server.use('/api/v1/users', usersRoutes);
    server.use('/api/v1/notification', notificationRoutes);

    //connect db
    createConnection(db_host,db_port,db,user,password);

    server.listen(port, () => {
        console.log(`Server is listening at port ${port}`);
    })
}catch(err){
    throw err;
}