const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) =>{
    const {authorization} = req.headers
    //authorization === Bearer asdarweqeadfjhas
    if(!authorization){
        res.status(401).json({error: "You must login to access."})
    }

    //extract the token from authorization header
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(401).json({error: "You must login to access."})
        }
        const {_id} = payload
        User.findById(_id)
            .then(user=>{
                req.user = user
                next()
            })
    })
}