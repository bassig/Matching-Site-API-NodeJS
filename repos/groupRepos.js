const db = require('../models/db');
const Group = require('../models/group');

class GroupRepos {

    async getAll() {
        return await Group.find({});
    }

    async updateCollectedAmount(id, donationAmount) {
        try {
            const group = await Group.findOne({ _id: id });
            if (!group) {
                throw new Error('Group not found');
            }
            group.collected += donationAmount;
            await group.save();
        } catch (error) {
            throw new Error(`Failed to update collected amount: ${error.message}`);
        }
    }
    async getGroupById(id) {
        try {
            const group = await Group.findOne({ _id: id });
            if (!group) {
                throw new Error('group not found');
            }
            return group;
        } catch (error) {
            throw new Error(`Failed to get group: ${error.message}`);
        }
    }
}

module.exports = new GroupRepos();