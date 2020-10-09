//var mssql = require("mssql");
var dbConfig = {
    
    server: "localhost",
    port: 1433,
    database: 'DDB_FinanceMonitoring',
    // If you're on Windows Azure, you will need this:
    options: { encrypt: true },
    authentication: {
        type: "default",
        options: {
            userName: "donatello",
            password: "P@ssw0rd"
        }
    }

};




module.exports = dbConfig; 