const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');

module.exports.register = (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({ id: user._id }, JWT_SECRET);
                res.cookie('userToken', userToken, { httpOnly: true })
                    .json(user);
            })
            .catch(err => {
                res.status(400).json({ error: err });
            });
    }

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).populate('organizations');
    if (user === null) {
        return res.status(400).json('Email or password incorrect.');
    };
    const passIsCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!passIsCorrect) {
        return res.status(400).json('Email or password incorrect.')
    };
    const userToken = jwt.sign({ id: user._id }, JWT_SECRET);
    res.cookie('userToken', userToken, { httpOnly: true }).json({userId: user._id,email: user.email, firstName: user.firstName, lastName: user.lastName, organizations: user.organizations});
};

module.exports.logout = (req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200);
};

module.exports.getAllUsersInOrg = (req, res) => {
    var usersInOrg = [];
    User.find({})
        .select('_id firstName lastName email')
        .populate('organizations')
        .forEach(emp => {
            emp.organizations.forEach(org => {
                if (org._id === req.body.orgId) {
                    usersInOrg.push(emp);
                }
            })
        })
        .then(res.status(200).json(usersInOrg))
        .catch(err => res.status(400).json(err));
}

module.exports.getUserById = (req, res) => {
    User.findById(req.body.userId)
        .select('_id firstName lastName email')
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}
