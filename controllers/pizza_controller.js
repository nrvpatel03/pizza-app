var express = require("express");
var pizza = require("../models/pizza.js");

var router = express.Router();

//get all pizzas from database
router.get("/", function(req, res){
    pizza.all(function(data){
        var handleBarsObj = {
            pizzas: data
        };
        //render handlebars
        res.render("index", handleBarsObj);
    });
});

//jquery post function where create one pizza
router.post("/api/pizzas", function(req,res){
    pizza.create(["pizza_name", "devoured"],
    [req.body.pizza_name, req.body.devoured], function(result){
    //after creating a new pizza, you send back an id
    //to the pizzas api.
    //result.insertId is mysql syntax for getting the final id of the thing added.
        res.json({id: result.insertId});
    });
});

router.put("/api/pizzas/:id", function(req,res){
    var condition = "id = " + req.params.id;
    pizza.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if(result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;


