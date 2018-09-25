var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    name: String,
    status: String,
    ticket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;