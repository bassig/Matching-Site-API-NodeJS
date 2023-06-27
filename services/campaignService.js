const campaignRepos = require('../repos/campaignRepos');

class CampaignServise {
    async getCampaigById(id) {
        return campaignRepos.getCampaignById(id);
    }
    async createCampaign(campaign) {
        return await campaignRepos.createCampaign(campaign);
    }
    async updateGoal(id, newGoal, isManager) {
        return await campaignRepos.updateGoal(id, newGoal, isManager)
    }
    async updateCollectedAmount(id, donationAmount) {
        return await campaignRepos.updateCollectedAmount(id, donationAmount)
    }
}

module.exports = new CampaignServise();