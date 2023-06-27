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
    },
    collected: {
        type: Number,
        integer: true,
        default: 0
    },
    campaignId: {
        type: mongoose.Schema.Types.Number,
        ref: 'Campaign'
    }

})
const Group = mongoose.model('groups', groupSchema);
module.exports = Group;