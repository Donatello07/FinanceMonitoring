
var sql = require("mssql");
var config = require('../db_config')

const GetTExpense = (res,storeProcedure) => {
    const connection = new sql.ConnectionPool(config);
    connection.connect().then(() => {
        const request = new sql.Request(connection);
        request.execute(storeProcedure).then((err) => {
            return res.send(err.recordset)
        }).catch((err) => {
            console.log(err);
        });
    })

}

module.exports = GetTExpense;