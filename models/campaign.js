const mongoose = require('mongoose');
const campaignSchema=new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
      },
    campaignName:String,
    date:{
        type:Date,
        default:Date.now
    },
    time:String,
    campaignGoal: {
        type: Number,
        integer: true
    },
    collected:Number
})
const Campaign=mongoose.model('campaigns',campaignSchema);
module.exports=Campaign;