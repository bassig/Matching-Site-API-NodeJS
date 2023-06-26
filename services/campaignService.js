const campaignRepos=require('../repos/campaignRepos');

class CampaignServise{
    async getCampaign(id){
        return campaignRepos.getCampaign(id);
    }
    async createCampaign(campaign){
        return await campaignRepos.createCampaign(campaign);
    }
    async updateGoal(id,newGoal,isManager){
        return await campaignRepos.updateGoal(id,newGoal,isManager)
    }
}

module.exports=new CampaignServise();