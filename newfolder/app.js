var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addUser', function (req, res) {
    // First read existing users.
    console.log(req.body.name);
    try {
        const data = fs.appendFileSync('user.txt',JSON.stringify(req.body))
        //file written successfully
      } catch (err) {
        console.error(err)
      }

    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //    data = JSON.parse( data );
    //    console.log( data );
    //    res.end( JSON.stringify(data));
    // });
 })
 
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
