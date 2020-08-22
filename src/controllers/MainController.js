module.exports = {
    async index(req, res){
        return res.json({
            message: "Bem vindo a rest api do dev radar",
            messageComandos: "Os Comandos disponiveis são: ",
            rotas: {
                rota1:{
                    rota: "/search",
                    tipo: "Get",
                    info: "pesquisar apenas desemvolvedores com technologias especificas",
                    parametros: "Usando Query. params : latitude, longitude, techs"
                },
                rota2: {
                    rota: "/devs",
                    tipo: "Get",
                    info: "listar todos desemvolvedores",
                    parametros: "Null/Nenhum"
                },
                rota3: {
                    rota: "/devs",
                    tipo: "Post",
                    info: "Guardar Informação dos devs na Db",
                    parametros: "Usando Body. params : github_username, techs, latitude, longitude"
                }
            }
        });
    }
}