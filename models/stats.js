const mongoose = require("mongoose");
const StatsSchema = mongoose.Schema({
    site: {
        type: Number,
        default: 0
    },
    api: {
        type: Number,
        default: 0
    }
});

module.exports = Stats = mongoose.model("Stats", StatsSchema);