const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
      },
    name: String,
    description: String,
    groupGoal: {
        type: Number,
        integer: true
    }

})
const Group = mongoose.model('groups', groupSchema);
module.exports=Group;