var express = require("express");
var tExpense = require('./Database/Expense/TExpense');
var insertExpense = require('./Database/Expense/InsertTExpense');
var GeTAccount = require('./Database/Account/GetAccount');
var getExpensebyDateRange = require('./Database/Expense/GetExpenseDateRange');
var getLastExpense = require('./Database/Expense/GetLastExpense');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    return next();
});

app.listen(852, () => {
    console.log("Your App now running on port 852 ..");
});


app.post('/Expense', (req, res) => {
    console.log(req.body)
    insertExpense(req.body, res);
});

app.get('/expense', (req, res) => {
    let queryString = req.query.q;
    if (queryString === "daterange") {
        getExpensebyDateRange(req.body.startDate, req.body.endDate).then(result => {
            return result.status === "success" ?
                res.send(result.data) :
                res.send("FailedGetData")

        }).catch((err) => { console.log(err) })
    }
    else if (queryString === "last") {
        getLastExpense().then(result => {
            return result.status === "success" ?
                res.send(result.data.recordsets[0]) :
                res.send("FailedGetData")
        }).catch((err) => { console.log(err) })
    }
    else if (queryString === "all") {
        let storedProcedure = 'SP_TExpense_GET';
        tExpense(res, storedProcedure);
    }
    else if (queryString === "today") {
        let storedProcedure = 'SP_TExpense_GET_Today';
        tExpense(res, storedProcedure);
    }
    else {
        return res.status(404).send("not found");
    }
});

app.get('/account', (req, res) => {
    GeTAccount(res);
});

app.get('/Category',(req,res)=>{
    let storedProcedure = 'SP_TExpenseCategory_GetAll';
        tExpense(res, storedProcedure);
})



