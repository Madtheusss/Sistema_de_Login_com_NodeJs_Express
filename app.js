const express = require('express');
const session = require ('express-session');
const bodyParser = require('body-parser'); // Realizar a interação com o formulário do HTML

//Servidor
const server = 3000;
let path = require('path')
const app = express();

//Monstrando o caminho das paginas HTML para o app.js
app.engine('html', require('ejs').renderFile); // npm install ejs para funcinar
app.set('view engine', 'html');
app.set('src', path.join(__dirname, '/src'));

app.listen(server, () => {
    console.log('servidor funcionando')
})

//Conf Pagina
app.use(session({secret:"jabsdjh2813u1892"}));
app.use(bodyParser.urlencoded({extended:true}));

//Criando um usuario manualmente
let login = "admin";
let password = "123";


//Renderizando a pagina html
app.get(('/'), (req, res) => {
    //Verificando se o usuario esta logado
    if(req.session.login){
        res.render('logado');
    }else{
        res.render('home')
    }
});


//Enviando os dados do login
app.post(('/'), (req, res) => {
    //Fazendo o login do usuario
    if(req.body.password == password && req.body.login == login){
        //Logado com sucesso 
        req.session.login = login;
        console.log("Usuario logado com sucesso")
        res.render('logado')
    }else{
        console.log("Usuario ou senha inexistente")
        res.render('home')
    }
    
});


