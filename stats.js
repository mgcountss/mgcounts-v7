const stats = require('./models/stats');

function updateStats() {
    stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
        if (item) {
            item.api++;
            item.save();
        }
    });
}

module.exports = updateStats;