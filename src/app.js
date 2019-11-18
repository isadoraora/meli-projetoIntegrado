const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/clientes", {useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error: '))
db.once('open', function(){
    console.log('conexão feita com sucesso.')
})
//Acima String de conexão com o mongodb

//rotas
const clientes = require("./routes/clientesRoute");

//middlelware abaixo
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use(bodyParser.json())

app.use("/clientes", clientes)
module.exports = app;