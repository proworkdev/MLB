var mongoose = require('mongoose');

var TeamsSchema = new mongoose.Schema;
TeamsSchema.add({ 
	name: 'string', 
	abbr: 'string',
	market: 'string',
	team_id: 'string'	
});

module.exports = mongoose.model('Teams', TeamsSchema);