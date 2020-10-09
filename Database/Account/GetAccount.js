var sql = require("mssql");
var config = require('../db_config')

const GetTExpense = (res) => {
    const connection = new sql.ConnectionPool(config);
    connection.connect().then(() => {
        const request = new sql.Request(connection);
        request.execute('SP_TAccount_GETALL').then((err) => {
            return res.send(err.recordset)
        }).catch((err) => {
            return res.status(404).send(`error , msg: ${err}`)
        });
    })

}

module.exports = GetTExpense;