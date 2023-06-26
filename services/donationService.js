const donationRepos=require('../repos/donationsRepos');

class DonationServise{
    async getAll(){
        return await donationRepos.getAll();
    }
    async createDonation(donation){
        return await donationRepos.createDonation(donation);
    }
}

module.exports=new DonationServise();