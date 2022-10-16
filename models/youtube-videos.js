const mongoose = require("mongoose");
const GlobalSchema = require('./schema.js')
const Schema = mongoose.Schema(GlobalSchema);

module.exports = Item = mongoose.model("youtube-videos", Schema);