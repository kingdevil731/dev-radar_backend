// Schemas
const Dev = require("../models/Developers");

// utils
const convert = require('../utils/parseStringAsArray');

module.exports = {
    // buscar devs em um raio de 10km e filtrar por tecnologias
    async index(request, response) {
        // desestruturacao
        const { latitude, longitude, techs } = request.query;
        // conversao de strings para array de strings
        const techsArray = convert(techs);


        const dados = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({
            dados
        });
    }
}