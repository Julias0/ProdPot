var User = require('../models/user');
var Project = require('../models/project');
var Board = require('../models/board');
var Ticket = require('../models/ticket');
var TimeSlot = require('../models/timeSlot');

module.exports = {
    addNewTimeEntry: async (task, startTime, endTime, assignedUserId) => {
        try {
            let timeSlot = new TimeSlot({
                task: task,
                date: Date.now(),
                startTime: startTime,
                endTime: endTime,
                assignedUser: await User.findById(assignedUserId)._id
            });
            let res = await timeSlot.save();
            var timeSlotList = await TimeSlot.find({
                assignedUser: await User.findById(assignedUserId)._id
            });

            return {
                status: 'success',
                payload: timeSlotList
            }
        } catch (error) {

            return {
                status: 'failure',
                error: error
            }
        }
    },
    getAllTimeEntries: async (assignedUserId) => {
        try {
            var timeSlotList = await TimeSlot.find({
                assignedUser: await User.findById(assignedUserId)._id
            });
            return {
                status: 'success',
                payload: timeSlotList
            }
        } catch (error) {
            return {
                status: 'error',
                error: error
            }
        }


    }
}