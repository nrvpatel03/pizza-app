
var orm = require("../config/orm.js");

var pizza = {
    all: function(cb){
        orm.selectAll("pizzas",function(res){
            cb(res);
        });
    },
    create: function(colsArr,valsArr,cb){
        orm.insertOne("pizzas",colsArr,valsArr,function(res){
            cb(res);
        });
    },
    update: function(objectColsVals, condition, cb){
        orm.updateOne("pizzas",objectColsVals,condition,function(res){
            cb(res);
        });
    }
};

module.exports = pizza;