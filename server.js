var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();
//static files are files clients download from server. They are not served by express
//by default so we need this for css, images and other stuff.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/pizza_controller.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("App now listening on localhost: " + PORT);
});
