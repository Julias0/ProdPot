var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSlotSchema = new Schema({
    task:String,
    date:Date,
    startTime: String,
    endTime:String,
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;