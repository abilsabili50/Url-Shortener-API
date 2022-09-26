const mongoose = require("mongoose");
const shortId = require("shortid");
const urlSchema = mongoose.Schema({
	baseUrl: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
		required: true,
	},
	clicks: {
		type: Number,
		required: true,
		default: 0,
	},
});

module.exports = new mongoose.model("url", urlSchema);
