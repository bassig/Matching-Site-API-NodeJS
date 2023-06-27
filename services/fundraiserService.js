const fundraiserRepos = require('../repos/fundraiserRepos');

class FundraiserServise {
    async getAll() {
        return await fundraiserRepos.getAll();
    }
    async getFundraiserById(id) {
        return await fundraiserRepos.getFundraiserById(id)
    }
    async updateGoal(id, newGoal) {
        return await fundraiserRepos.updateGoal(id, newGoal)
    }
    async updateCollectedAmount(id, donationAmount) {
        return await fundraiserRepos.updateCollectedAmount(id, donationAmount)
    }
}

module.exports = new FundraiserServise();