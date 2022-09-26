const router = require("express").Router();
const {
	shorteningUrl,
	redirectingUrl,
} = require("../controllers/url_controller");

router.get("/", (req, res) => {
	res.send("Helo dunia");
});

router.post("/urlShortener", shorteningUrl);

router.get("/:shortUrl", redirectingUrl);

module.exports = router;
