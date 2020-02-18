var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
//var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    image:{
        type:String,
        default:"default.jpg"
    },
  
});

User.plugin(passportLocalMongoose);
//User.plugin(AutoIncrement);
module.exports = mongoose.model('user', User);