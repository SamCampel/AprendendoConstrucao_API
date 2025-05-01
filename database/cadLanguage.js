const Sequelize = require ("sequelize");
const connection = require ("./database");

const Language = connection.define('language', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    version:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'language'
});

Language.sync({force: false}).then (() => {
    console.log("Tabela Language Ok");

}).catch((error) => {

    console.error("Erro ao criar tabela Language:", error);
});

module.exports = Language;