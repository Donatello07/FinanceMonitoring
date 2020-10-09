var sql = require("mssql");
var config = require('../db_config')

const InsertToTExpense = (item, res) => {
    const connection = new sql.ConnectionPool(config);
    connection.connect().then(() => {
        const request = new sql.Request(connection);
        const _date =  new Date(item.Expense_Date);
        const _datecreated = new Date(item.Expense_CreatedDate);
        console.log("date : " + _date + " , datecreated" + _datecreated );

        request.input('Expense_Id', sql.UniqueIdentifier, null)
        request.input('Expense_Name', sql.NVarChar(255), item.Expense_Name);
        request.input('Expense_Amount', sql.BigInt, item.Expense_Amount);
        request.input('Expense_Date', sql.DateTime,_date);
        request.input('Expense_CreatedDate', sql.DateTime, _datecreated);
        request.input('Expense_Description', sql.NVarChar(100), item.Expense_Description);
        request.input('Expense_Image', sql.NVarChar(500), item.Expense_Image);
        request.input('Expense_Category_Id', sql.UniqueIdentifier, item.Expense_Category_Id);
        request.input('Expense_Payment_ID', sql.UniqueIdentifier, item.Expense_Payment_ID);

        request.execute('SP_TExpense_Insert').then((err) => {
            return res.json({ "result": "Success" });
        }).catch((err) => {
            console.log(err)
            return res.json({ "result": err });
        });
    })

}

module.exports = InsertToTExpense;