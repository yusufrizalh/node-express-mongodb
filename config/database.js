var mongoose = require('mongoose');
var chalk = require('chalk');

var dbURL = require('./properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function() {
    mongoose.connect(dbURL);

    mongoose.connection.on('connected', function() {
        console.log(connected("Koneksi Mongoose terkoneksi: ", dbURL));
    });

    mongoose.connection.on("error", function (err) {
      console.log(error("Koneksi Mongoose terjadi error: " + err));
    });

    mongoose.connection.on("disconnected", function () {
      console.log(disconnected("Koneksi Mongoose telah diskonek!"));
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination("Koneksi Mongoose telah diterminasi!"));
            process.exit(0)
        });
    });
}