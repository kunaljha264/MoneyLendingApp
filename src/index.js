const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiRoutes = require('./routes/index');

app.use('/', apiRoutes);
const connect = require("./config/database");
app.listen(3000, async()=>{
    console.log("Server running at PORT 3000");
    await connect();
    console.log("Mongodb connected");
})