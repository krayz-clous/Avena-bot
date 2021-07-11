const mongo = require("mongoose"),
config = require("../config.js"),
Schema = mongo.Schema,
	languages = require("../languages/language-meta.json");

const reqString = {
    type: String,
    required: true
}

const reqBoolean = {
    type: Boolean,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

module.exports = mongo.model('Guild', new mongo.Schema({
    id: String,
    Current: Number,
    Channel: String,
    prefix: reqString,
    language: reqString,
    invite_leaderboard: reqBoolean,
    membersData: { type: Object, default: {} },
	members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    language: { type: String, default: languages.find((l) => l.default).name },
    casesCount: { type: Number, default: 0 },
	ignoredChannels: { type: Array, default: [] }, // Channels ignored by the bot
	customCommands: { type: Array, default: [] }, // Custom commands of the guild
	commands: { type: Array, default: [] }, // Commands logs
	autoDeleteModCommands: { type: Boolean, default: false }, // Whether to auto delete moderation commands
	disabledCategories: { type: Array, default: [] }
}))