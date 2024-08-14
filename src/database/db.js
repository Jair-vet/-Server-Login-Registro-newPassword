const mysql = require('mysql');
const constants = require('../helpers/constants/constants')

module.exports = {
    connection: function () {
        return mysql.createPool({
            connectionLimit: 2000,
            host: constants.HOST,
            database: constants.DATABASE,
            user: constants.USERDB,
            password: constants.PASSWORD,
            supportBigNumbers: true,
            bigNumberStrings: true,
            dateStrings: [
                'DATE',
                'DATETIME',
                'TIMESTAMP'
            ],

        });
    },
}