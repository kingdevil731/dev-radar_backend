// express
const { Router } = require("express");
// rotas init
const routes = Router();
//Controladores abaixo para as rotas
const DevControllers = require('./controllers/DevController');
const SearchControllers = require('./controllers/SearchController');
const MainController = require("./controllers/MainController");

// rotas
// informação geral das rotas
routes.get("/", MainController.index);
//* Listar developers com tecnologia's especificas
routes.get("/search", SearchControllers.index);
//* Listar os developers
routes.get('/devs', DevControllers.index);
//* Criar novo developer
routes.post('/devs', DevControllers.guardar);

//export das rotas
module.exports = routes;