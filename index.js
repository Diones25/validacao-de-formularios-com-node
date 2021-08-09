const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser("shdjkhsfioehsa"));

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());

app.get("/", (req, res) => {

    let emailErro = req.flash("emailError");
    let pontosErro = req.flash("pontosError");
    let nomeErro = req.flash("nomeError");

    emailErro = (emailErro == undefined || emailErro.length == 0) ? undefined : emailErro

    res.render("index", {
        emailErro, 
        pontosErro, 
        nomeErro, 
        email: req.flash("email"),
        pontos: req.flash("pontos"),
        nome: req.flash("nome")
    });
});

app.post("/form", (req, res) => {
    let { email, nome, pontos}  = req.body;

    let emailErro;
    let pontosErro
    let nomeErro;

    if(email == undefined || email == ""){
        //Erro
        emailErro = "O email não pode ser vazio!"
    }

    if(pontos == undefined || pontos < 20){
        //Erro
        pontosErro = "Você não pode ter menos de 20 pontos!";
    }

    if(nome == undefined || nome == ""){
        //Erro
        nomeErro = "Nome não pode ser vazio!"
    }

    if(nome.length < 4){
        nomeErro = "O nome não pode ter menos de 4 caracteres"
    }

    if(emailErro != undefined || pontosErro != undefined || nomeErro != undefined){
        req.flash("emailError", emailErro);
        req.flash("pontosError", pontosErro);
        req.flash("nomeError", nomeErro);

        req.flash("email", email);
        req.flash("pontos", pontos);
        req.flash("email", nome);

        //Se ocorrer qualquer erro é redirecionado para a home
        res.redirect("/");
    }
    else{
        res.send("Dados enviados");
    }

});






app.listen(3000, (req, res) => {
    console.log("Servidor rodando!");
})