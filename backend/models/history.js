var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    uid:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    age: {
        type: Number,
    },
    medical_condition:{
        type: String,
        
    },
    head_injury:{
        type:Boolean
    },
    surgery:{
        type:Boolean
    },
    heart_patient:{
        type:Boolean
    },
    other_disease:{
        type:String
    }
});

module.exports = mongoose.model('History', historySchema);