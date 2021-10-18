const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURL } = require("./server/config/keys.js")

//connect to mongo db
mongoose.connect(MONGOURL);
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
})
mongoose.connection.on("error", (err) => {
    console.log('Error connecting', err);
})

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public', ));

//get mongodb model
require('./server/models/user.model');
require('./server/routes/user.route')(app);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})