const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Language = require("./database/cadLanguage");
const User = require("./database/cadUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connection.authenticate()
    .then(() => {
        console.log("Banco sincronizado");
    })
    .catch((msgErro) => {
        console.error("Erro de conexão do banco");
    });


function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(401).json({ error: "Token não fornecido." });
    }

    jwt.verify(token, "JwtS3cr3tK3y!2023@Secure", (err, user) => {

        if(err){
            return res.status(403).json({ error: "Token inválido ou expirado." });
        }
        req.user = user;
        next();
    });
}

app.get("/languages", async (req, res) => {
    try {
        const languages = await Language.findAll();
        res.status(200).json(languages);
    } catch (err) {
        res.status(500).json({});
    }
});

app.get("/language/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({});
    }

    try{
        const language = await Language.findByPk(id);

        if(language){
            res.status(200).json(language);
        }else{
            res.status(404).json({ error: "Linguagem não encontrada." });
        }
    } catch(err) {
        res.status(500).json({ error: "Erro ao buscar linguagem." });
    }
});

app.post("/language", async (req, res) => {
    const { title, year, version } = req.body;

    if(!title || !year || !version){
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try{
        const newLanguage = await Language.create({ title, year, version });
        res.status(201).json(newLanguage);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar linguagem." });
    }
});


app.put("/language/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)){
        return res.status(400).json({ error: "ID inválido." });
    }

    const { title, year, version } = req.body;

    try {
        const language = await Language.findByPk(id);

        if (language){
            if (title) language.title = title;
            if (year) language.year = year;
            if (version) language.version = version;

            await language.save();
            res.status(200).json(language);
        }else{
            res.status(404).json({ error: "Linguagem não encontrada." });
        }
    } catch(err) {
        res.status(500).json({});
    }
});

app.delete("/language/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
    }

    try {
        const language = await Language.findByPk(id);

        if(language){
            await language.destroy();
            res.status(200).json({ message: "Linguagem deletada com sucesso." });
        }else{
            res.status(404).json({});
        }
    } catch(err) {
        res.status(500).json({});
    }
});

//autenticação!!!!!!!!!!!!!!!!!!!!!!!!
app.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    //verifica os campos
    if (!email || !password){
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    try {
        //encontra o usuario no banco
        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(404).json({ error: "Usuário não encontrado..." });
        }

        //confere a senha!!!!!!!!!!!!!!!!!!
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).json({ error: "Sua senha está incorreta..."})
        }

        //geranção dos tokens

        const token = jwt.sign(
            //payload, dados que eu quero armazenas no token 
            { id: user.id, email: user.email}, 

            //secret_key
            "JwtS3cr3tK3y!2023@Secure",
            
            //expiração do token
            { expiresIn: "48h"}
        );

        //return token
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: "Erro na autenticação do usuário." });
    }
});

app.listen(1234, () => {
    console.log("API rodando...");
});