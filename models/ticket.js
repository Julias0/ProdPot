var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    name: String,
    status: String,
    desc: String,
    status: String,
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

var Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;