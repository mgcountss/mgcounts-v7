const mongoose = require("mongoose");
const GlobalSchema = require('./schema.js')
const Schema = mongoose.Schema(GlobalSchema);

module.exports = Item = mongoose.model("reddit-user", Schema);