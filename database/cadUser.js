const Sequelize = require ("sequelize");
const connection = require ("./database");

const User = connection.define('user', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true // Valida se o valor é um e-mail válido
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'user'
});

User.sync({force: false}).then (() => {
    console.log("Tabela Users Ok");

}).catch((error) => {

    console.error("erro ao criar tabela User:", error);
});

module.exports = User;