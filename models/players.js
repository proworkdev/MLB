var mongoose = require('mongoose');
// define the schema for our user model
var PlayerSchema = new mongoose.Schema;
PlayerSchema.add({ 
	player_id: 'string', 
	team_id: 'string',
	status: 'string',
	position: 'string',
	primary_position: 'string',
	first_name: "string",
	last_name: "string",
	preferred_name: "string",
	jersey_number: "Number",
	full_name: "string",
	mlbam_id:"Number",
	height: "Number",
	weight:"Number",
	throw_hand: "string",
	bat_hand:"string",
	high_school:"string",
	birthdate:"string",
	birthcountry:"string",
	birthcity:"string",
	last_update:"string"

});

module.exports = mongoose.model('Players', PlayerSchema);