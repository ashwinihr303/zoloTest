//for logging the errors into logger text file for debugging
var fs = require('fs');
var errLogger = function(err, req, res, next) {
    if (err) {
        fs.appendFile('ErrrorLogger.txt', `${err.stack}\n`, function(err1) {
            if (err1) {
                console.log("Error while writing into logger file");
            }
        });
        res.status(err.statusCode ? err.statusCode : 500);
        res.json({ "message": err.message ? err.message : "Unknown error occurred." })
    }
    next();

}
module.exports = errLogger;