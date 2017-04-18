var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	name : String,
	decs :String
});

module.exports = mongoose.model('Books',bookSchema);