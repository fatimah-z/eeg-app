var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
    dataset:{
        type: mongoose.Types.ObjectId,
        ref: 'dataset',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    data:  {
        type: [Number],
        required: true
    },
    time:  {
        type: [Number],
        required: true
    },
    type:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Channel', channelSchema);