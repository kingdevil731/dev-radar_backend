const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require('http');
const cors = require('cors');
const {setupSocket} = require('./websocket');

mongoose.connect('mongodb+srv://omni:omni@cluster0.vuy2a.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = express();
const server = http.Server(app);
// enviar o server como parametro para o setup
setupSocket(server);
// cors para habilitar o acesso de outro lugar/origin
app.use(cors());
// para usar json
app.use(express.json());

// Metodos Http: Get, Post, Put, Delete.~
// Tipos de Parametros: 
// * Query params: => ?NOMEdoPARAMETRO=VALOR ( Exemplo: ?search_page=2) . usados geralmente para filtragem de dados, paginação, ordenação , e varios outros.
// para obter o query usamos o NomeDaVariavelNaFuncao.query . exemplo request.query.
// * Route params: usado geralmente para PUT e Delete, para especificar um usuario ou um item apenas.
//  /rota/VALOR . para usar sera /rota/:valor . ": " para identificar um recurso em route. 
// para obter usamos o NomeDaVariavelNaFuncao.params . exemplo request.params
// * Body : request.body ( Dados para criação ou alteração de um registro).

app.use(routes);
// ira receber a porta indicada pelo servidor caso nao consiga receber a porta 3333
server.listen(process.env.PORT || 3333);