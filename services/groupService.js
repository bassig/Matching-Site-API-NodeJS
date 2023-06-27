const groupRepos = require('../repos/groupRepos');

class GroupServise {
    async getAll() {
        return await groupRepos.getAll();
    }
    async updateCollectedAmount(id, donationAmount) {
        return await groupRepos.updateCollectedAmount(id, donationAmount)
    }
    async getGroupById(id) {
        return await groupRepos.getGroupById(id)
    }
}

module.exports = new GroupServise();