const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User") 
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');

module.exports = {
    register(req, res) {
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({ id: user._id }, JWT_SECRET);
            res.cookie('userToken', userToken, { httpOnly: true })
                .json({ msg: 'Success' });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
    },

    login(req, res) {
        const user = await User.findOne({ email: req.body.email })
        if (user === null) {
            return res.status(400).json('Email or password incorrect.');
        };
        const passIsCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passIsCorrect) {
            return res.status(400).json('Email or password incorrect.')
        };

        const userToken = jwt.sign({ id: user._id }, JWT_SECRET);
        res.cookie('userToken', userToken, { httpOnly: true });
    },

    logout(req, res) {
        res.clearCookie('userToken');
        res.sendStatus(200);
    },

    isLoggedIn(req, res) {
        res.sendStatus(200);
    },
    
}

