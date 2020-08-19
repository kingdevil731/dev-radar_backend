// mongoose
const mongoose = require('mongoose');
// Schemas
const PointSchema = require('./utils/PointSchema');
//criacao do schema
const devSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
});
// exporte usando o metodo model com o string para nome da col, e o schema como segunda variavel/parametro
module.exports = mongoose.model('Dev', devSchema);