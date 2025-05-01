const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','senha1234',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;