const mongo = require("mongoose"),
Canvas = require("canvas");

const genToken = () => {
	let token = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
	for (let i = 0; i < 32; i++){
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return token;
};

module.exports = mongo.model('Users', new mongo.Schema({
    id: String,
    Guild: String,
    Counts: Number,
}))