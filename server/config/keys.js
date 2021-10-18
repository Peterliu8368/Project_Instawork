if(process.env.NODE_ENV==='production'){
    module.exports = require('./prod')
} else {
    console.log("getting dev keys");
    module.exports = require('./dev')
}