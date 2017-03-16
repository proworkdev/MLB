var request = require('request');
var Team   = require('../models/teams.js');
var Player = require('../models/players.js');
var  async = require('async');
var request = require('request');

module.exports = function(app, passport) {

    app.get('/dashboard', isLoggedIn,function(req, res) {
        res.render('dashboard', {
            layout: 'adminlayout',
            user : req.user,
            title: 'Dashboard'
        });
    });

    app.get('/mlbData', function(req, res) {
        request('http://localhost:8080/data/mlbdata.json', function (error, response, mlbData) {
            console.log('a');
            if (!error && response.statusCode == 200) {
                //res.send(JSON.parse(mlbData));
                var playerData = JSON.parse(mlbData);
                for(var team in playerData.teams){
                    name = playerData.teams[team].name;
                    abbr = playerData.teams[team].abbr;
                    market = playerData.teams[team].market;
                    team_id = playerData.teams[team].id;
                   // players = playerData.teams[team].players;
                   players = playerData.teams[team].players;
                   var teamDatabaseId;
                 //  Team.findOne({team_id : team_id},function(err,teamdata){

               // if(teamdata == null){ // Check if alerady team inserted
                var newTeam = new Team();
                newTeam.name = name;
                newTeam.abbr = abbr;
                newTeam.market = market;
                newTeam.team_id = team_id;
                newTeam.players = players;
                newTeam.save();
                    teamDatabaseId = newTeam._id;  // Team Inserted Id
              /*  }else{
                    teamDatabaseId = teamdata._id; // Team Id from Database
                }*/
          //  });
         /*   var newTeam = new Team();
            newTeam.name = name;
            newTeam.abbr = abbr;
            newTeam.market = market;
            newTeam.team_id = team_id;
            newTeam.save();
            teamDatabaseId = newTeam._id;
            for(var player in players){
                var newPlayer = new Player();
                newPlayer.team_id   = teamDatabaseId;
                newPlayer.player_id = players[player].id;
                newPlayer.status = players[player].status;
                newPlayer.position = players[player].position;
                newPlayer.primary_position = players[player].primary_position;
                newPlayer.first_name = players[player].first_name;
                newPlayer.last_name = players[player].last_name;
                newPlayer.preferred_name = players[player].preferred_name;
                newPlayer.jersey_number = players[player].jersey_number;
                newPlayer.full_name = players[player].full_name;
                newPlayer.mlbam_id = players[player].mlbam_id;
                newPlayer.height = players[player].height;
                newPlayer.weight = players[player].weight;
                newPlayer.throw_hand = players[player].throw_hand;
                newPlayer.bat_hand = players[player].bat_hand;
                newPlayer.high_school = players[player].high_school;
                newPlayer.birthdate = players[player].birthdate;
                newPlayer.birthcountry = players[player].birthcountry;
                newPlayer.birthcity = players[player].birthcity;
                newPlayer.last_update = players[player].updated;
                newPlayer.save(function(err) {
                    if (err)
                        throw err;
                });
            }*/



        }
    }
});



        res.send('Teams Inserted');
    });
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.session.user){
     return next();    
 }else{
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }  
}
