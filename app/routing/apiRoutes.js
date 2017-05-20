var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var friendsJson = require("../data/friends.js")

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        var chosen = req.params.friends;

        if (chosen) {
            console.log(chosen);

            for (var i = 0; i < friendsJson.length; i++) {
                if (chosen === friendsJson[i].routeName) {
                    return res.json(friendsJson[i]);
                }
            }
            return res.json(false);
        }
        return res.json(friendsJson);
        
    });
    var bestMatch = 0;
    var bestDiff = 1000; 

app.post("/api/friends", function(req, res){

//holds the best match and will update as it loops through the options
    var bestMatch = {
        name: "",
        location: "",
        age: "",
        photo: "",
        friendDifference: 1000
    };
//posts and parses the result of the users's survey
var userData = req.body;
var userName = userData.name;
var userPhoto = userData.photo;
var userScores = userData.scores;

    for (var i = 0; i < friendsJson.length; i++) {

      console.log("comparing with " + friendsJson[i].name);

      var totalDifference = 0;


      for (var k = 0; k < 2; k++ ){
        
        console.log("someone did " + friendsJson[i].scores[k]);
        //console.log("you entered " +  req.body.scores[k]);
        console.log("you differed by " + Math.abs(friendsJson[i].scores[k] - req.body.scores[k]) );

        totalDifference = totalDifference + Math.abs(friendsJson[i].scores[k] - req.body.scores[k]);

      }

      if (totalDifference < bestDiff){
        bestDiff = totalDifference;
        bestMatch = i;
      }

      console.log("total difference for " + friendsJson[i].name + " is " + totalDifference);

    }

    console.log("=============================");
    console.log("best person is " + friendsJson[bestMatch].name + " and best score is " + bestDiff);
    console.log("=============================");

    // push in the user input into the friendArray
    friendsJson.push(req.body);

    // respond back with the best match
    res.json(
    {
        name: friendsJson[bestMatch].name, 
        photo: friendsJson[bestMatch].photo
    }); // KEY LINE
    
  

 });
}
