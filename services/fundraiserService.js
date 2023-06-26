const fundraiserRepos=require('../repos/fundraiserRepos');

class FundraiserServise{
    async getAll(){
        return await fundraiserRepos.getAll();
    }
    async getById(id){
        return await fundraiserRepos.getAllWithId(id);
    }
    async updateGoal(id,newGoal){
        return await fundraiserRepos.updateGoal(id,newGoal)
    }
    async updateCollectedAmount(id,donationAmount){
        return await fundraiserRepos.updateCollectedAmount(id,donationAmount)
    }
}

module.exports=new FundraiserServise();