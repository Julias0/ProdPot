var databaseAccess = require('../databaseAccess/databaseAccess');

module.exports = {
    addNewTimeEntry: async (req, res) => {
        var { task, starttime, endtime } = req.body;
        var assignedUserId = req.user.id;
        res.json(await databaseAccess.addNewTimeEntry(task, starttime, endtime, assignedUserId));
    },
    getDashboard: async (req, res) => {
        var timeEntriesDbData = await databaseAccess.getAllTimeEntries(req.user.id);
        res.render('timetracker', { user: req.user, timeEntriesData: timeEntriesDbData.payload });
    },
    getDashboardData: async (req, res) => {
        var timeEntriesDbData = await databaseAccess.getAllTimeEntries(req.user.id);
        res.json(timeEntriesDbData.payload);
    }
}