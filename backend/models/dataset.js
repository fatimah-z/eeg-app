var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datasetSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    measurement_date: {
        type: String
    },
    Experimenter:  {
        type: String
    },
    Good_channels:{
        type:[{
            cid: mongoose.Types.ObjectId,
            ref:'channel',
            name:{
                type: String
            }
        }]
    },
    Bad_channels:{
        type:[{
            cid: mongoose.Types.ObjectId,
            ref:'channel',
            name:{
                type: String
            }
        }]
    },
    EOG_channels:{
        type:[{
            cid: mongoose.Types.ObjectId,
            ref:'channel',
            name:{
                type: String
            }
        }]
    },
    samplimg_frequency:{
        type: String,
        required:true
    },
    HighPass:{
        type: String,
        
    },
    lowpass:{
        type: String,
        
    },
    Duration:{
        type: String,
        required:true
    },
});

module.exports = mongoose.model('Dataset', datasetSchema);