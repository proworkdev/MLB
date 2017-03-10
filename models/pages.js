var mongoose = require('mongoose');

var PagesSchema = new mongoose.Schema;
PagesSchema.add({ 
	title: 'string',
	slug: 'string', 
	content: 'mixed'
});

module.exports = mongoose.model('Pages', PagesSchema);