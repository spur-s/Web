var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var vehiclestopSchema = new Schema({
    stopname: {
        type: String,
        required: true,
        unique:true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    }
}, {
        timestamps: true
    });

var Vehiclestop = mongoose.model('vehiclestop', vehiclestopSchema);

module.exports = Vehiclestop;