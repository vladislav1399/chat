const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegram',
    'postgres',
    'Aa90397850',
    {
        host: 'localhost',
        port: '5432',
        dialect: "postgres"
    }

)