const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { MONGOURL } = require("./config/keys.js")
const cors = require("cors");

//connect to mongo db
mongoose.connect(MONGOURL);
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
})
mongoose.connection.on("error", (err) => {
    console.log('Error connecting', err);
})

//get mongodb model
require('./models/user.model');

//body parser
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})