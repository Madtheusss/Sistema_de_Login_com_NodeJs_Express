const express = require('express');
const session = require ('express-session');
const bodyParser = require('body-parser'); // Realizar a interação com o formulário do HTML


//paginas HTML
const home = __dirname + "/src/index.html";
const paginaLogado = __dirname + "/src/logado/index.html";

//Servidor
const server = 3000;
const app = express();

app.listen(server, () => {
    console.log('servidor funcionando')
})

//Conf Pagina
app.use(session({secret:"amoeba"}));
app.use(bodyParser.urlencoded({extended:true}));

//Criando um usuario manualmente
let login = "admin";
let password = "123";


//Renderizando a pagina html
app.get(('/'), (req, res) => {
    //Verificando se o usuario esta logado
    if(req.session.login){
        res.render("logado");
    }else{
        res.sendFile(home)
    }
});


//Enviando os dados do login
app.post(('/'), (req, res) => {
    //Fazendo o login do usuario
    if(req.body.password == password && req.body.login == login){
        //Logado com sucesso 
        req.session.login = login;
        console.log("Usuario logado com sucesso")
        res.sendFile(paginaLogado)
    }else{
        console.log("Usuario ou senha inexistente")
        res.sendFile(home)
    }
    
});


