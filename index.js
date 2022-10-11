const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// import routes
const routes = require("./app/routes/url_route");

app.use("/api", routes);

app.listen(process.env.PORT, () => {
	console.log("Server running at http://localhost:3000");
});
