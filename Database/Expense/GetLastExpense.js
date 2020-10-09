
var sql = require("mssql");
var config = require('../db_config')


var GetLastExpense = () => {

    return new Promise((resolve, rejected) => {
        const connection = new sql.ConnectionPool(config);
        connection.connect().then(() => {
            const request = new sql.Request(connection);
            request.execute('SP_GetLastExpense').then((err) => {
                console.log(err.recordset[0]);
                resolve({ "status": "success", "data": err });
            });
        })
    })
}


module.exports = GetLastExpense;