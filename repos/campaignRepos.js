const db=require('../models/db');
const Campaign=require('../models/campaign');

class CampaignRepos{
    constructor(){
        db.connect();
    }

    async getCampaign(id){
        try{
            const campaign=await Campaign.findById(id);
            return campaign
        }catch (err) {
            console.error(err);
            throw err;
        }
    }

    async createCampaign(campaign){
        try {
             await Campaign.create(campaign);
        } catch(err) {
            console.log('Error::' + err);
            throw err;
        }
    }

    async updateGoal(id, newGoal,isManager) {
        if(isManager=='true'){
        try {
          const campaign = await Campaign.findByIdAndUpdate(
            id,
            { $set: { campaignGoal: newGoal } },
            { new: true }
          );
          return {"new goal":campaign.campaignGoal};
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      else{
        return "acsses denied"
      }
    }
}

module.exports=new CampaignRepos();