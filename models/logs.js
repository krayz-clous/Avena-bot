const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  logChannelID: String,
  webhookid: String,
  webhooktoken: String,

  commandName: { type: String, default: "unknown" },
	date: { type: Number, default: Date.now() },
	author: { type: Object, default: {
		username: "Unknown",
		discrminator: "0000",
		id: null
	}},
	guild: { type: Object, default: {
		name: "Unknown",
		id: null
	}}
})

module.exports = mongoose.model("Log", logSchema, "log");