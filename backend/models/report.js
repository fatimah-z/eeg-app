var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref:'users',
        required: true,
    },
    prediction:  {
        type: String,
        required: true
    },
    datsetid:{
        type:mongoose.Types.ObjectId,
        ref: 'dataset'
    }
});

module.exports = mongoose.model('Report', reportSchema);