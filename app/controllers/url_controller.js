const ShortUrl = require("../models/url_model");
const shortId = require("shortid");

exports.shorteningUrl = async (req, res) => {
	const { baseUrl, customUrl } = req.body;
	let shortUrl = customUrl
		? customUrl.split(" ").join("-")
		: shortId.generate();
	if (customUrl) {
		const check = await ShortUrl.findOne({ shortUrl });
		if (check)
			return res.status(400).json({
				status: "fail",
				msg: "Custom URL already exists",
			});
		await ShortUrl.create({ baseUrl, shortUrl });
		return res.json({
			status: "success",
			msg: "Url has been shortened",
			shortUrl,
		});
	}
	let check;
	do {
		check = await ShortUrl.findOne({ shortUrl });
		if (check) shortUrl = shortId.generate();
	} while (check);
	await ShortUrl.create({ baseUrl, shortUrl });
	res.json({
		status: "success",
		msg: "Url has been shortened",
		shortUrl,
	});
};

exports.redirectingUrl = async (req, res) => {
	const { shortUrl } = req.params;
	const findUrl = await ShortUrl.findOne({ shortUrl });
	if (!findUrl)
		return res.status(400).json({
			status: "fail",
			msg: "Invalid Url",
		});

	findUrl.clicks++;
	findUrl.save();
	res.redirect(findUrl.baseUrl);
};
