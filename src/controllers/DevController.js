// axios
const axios = require("axios");
// Schemas
const Dev = require("../models/Developers");
// utils
const convert = require('../utils/parseStringAsArray');
//find Connection
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
    //@Listar os developers
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },
    // @Guardar => usado na criacao de uma entidade Developer
    async guardar(request, response) {
        // Obtemos os dados atraves da desestruturacao do body
        const { github_username, techs, latitude, longitude } = request.body;
        //verificar na db se o usuario ja existe
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
           
            // axios call GET
            const res = await axios.get(`https://api.github.com/users/${github_username}`);
            /*
            Obtemos os dados atraves da desestruturacao da resposta da chamada da api
            name = login  => se nao existir/estiver nulo/vazia o name , ele ira procurar por login
            */
            const { name = login, avatar_url, bio } = res.data;
            // ira separar os valores pela , e depois ira remover os espacos antes e depois do string/texto
            const techsArray = convert(techs);
            // variavel de localizacao
            const location = {
                type: "Point",
                coordinates: [longitude, latitude],
            };
            // variavel de dados para guardar na db
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
            // filtar as conexoes que estao no maximo ha 10km de distancia
            // e que o novo dev tenha pelo menos uma das techs filtradas
             const sentSocketMessageto = findConnections(
                 {latitude, longitude}, 
                 techsArray);

           
            sendMessage(sentSocketMessageto, "newDev", dev);
        }
        // retornamos a resposta em formato json
        return response.json(dev);
    },

    // criar update, delete
}