//import connection to connect to database
var connection = require("./connection.js");

//make a function that will create question marks
function makeQuestionMarks(valsLength){
    var markArr = [];
//question marks will be generated based on valsArrayLength
    for(var i = 0; i < valsLength; i++){
        markArr.push("?");
    }
    return markArr.toString();
}

//make {hello: 'World', name: 'Nirav'} into [hello='World', name='Nirav']
//then turn that array into string with commas.
function makeReadableForSql(object){
    var sqlArr = [];
    //for each loop for objects
    for (var key in object){
    //get value from object key
    var value = object[key];
    //check if object has property
    if(Object.hasOwnProperty.call(object, key)){
    //if value at key is a string and it has a space somewhere in the middle,
    //surround the entire value with quotes so sql can read it.
        if(typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
            }
            //push the key with the value with an = sign in between.
            sqlArr.push(key + "=" + value);
        }
    }
    //now that we make an array, change it to a string so sql can read
    return sqlArr.toString();
}

var orm = {
    selectAll: function(table, cb){
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, colsArr, valsArr, cb){
        //create a query string taking cols array and turning into string
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += colsArr.toString();
        queryString += ") ";
        queryString += "VALUES (";
        //call that question mark function to get right num of question marks
        queryString += makeQuestionMarks(valsArr.length);
        queryString += "); ";
        connection.query(queryString, valsArr, function(err, result){
            if(err){
                throw err;
            }
            //call back the result to solve async problems
            cb(result);
        });
    },
    // passin multiple objects here from req.body
    //sql doesnt take objects, so turn into something it can read
    updateOne: function(table, objectColsVals, condition, cb){
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += makeReadableForSql(objectColsVals);
        queryString += " WHERE " + condition;
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;