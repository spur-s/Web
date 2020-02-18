var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var vehiclerouteSchema = new Schema({
    routename: {
        type: String,
        required: true
        
    },
    stop: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehiclestop'
    }],
    type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
    }, 
    {
        timestamps: true
    });

var Vehicleroute = mongoose.model('vehicleroute', vehiclerouteSchema);

module.exports = Vehicleroute;