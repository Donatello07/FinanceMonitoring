
var sql = require("mssql");
var config = require('../db_config')

// const GetTExpense = (startdate, endDate) => {
//     const connection = new sql.ConnectionPool(config);
//     connection.connect().then(() => {
//         const request = new sql.Request(connection);
//         request.input('startDate', sql.DateTime, startdate);
//         request.input('endDate', sql.DateTime, endDate);
//         request.execute('SP_TExpense_GETbyDateRange').then((err) => {
//             return {
//                 "status": "succes",
//                 "message": err.recordset
//             }
//         }).catch((err) => {
//             return {
//                 "status": "failed",
//                 "message": err
//             }
//         });
//     })
// }

var promGetTexpenseByDateRange = (startdate, endDate) => {
    console.log(new Date(startdate) + " " + new Date(endDate));

    return new Promise((resolve, rejected) => {
        const connection = new sql.ConnectionPool(config);
        connection.connect().then(() => {
            const request = new sql.Request(connection);
            request.input('startDate', sql.DateTime, new Date(startdate));
            request.input('endDate', sql.DateTime, new Date(endDate));
            request.execute('SP_TExpense_GETbyDateRange').then((err) => {
                resolve({ "status": "success", "data": err });
            });
        })
    })
}


module.exports = promGetTexpenseByDateRange;