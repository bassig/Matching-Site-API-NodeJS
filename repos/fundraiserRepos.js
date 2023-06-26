const db = require('../models/db');
const Fundraiser = require('../models/fundraiser');

class FundraiserRepos {
    constructor() {
        db.connect();
    }
    async  updateGoal(id, newGoal) {
      try {
        const fundraiser = await Fundraiser.findByIdAndUpdate(
          id,
          { $set: { goal: newGoal } },
          { new: true }
        );
        return {"new goal":newGoal};
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async updateCollectedAmount(id, donationAmount) {
      try {
        const fundraiser = await Fundraiser.findById(id);
        const newCollectedAmount = fundraiser.collectedAmount + donationAmount;
        fundraiser.collectedAmount = newCollectedAmount;
        await fundraiser.save();
    
        return { "collected amount": newCollectedAmount };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    



    async getAll() {
        try {
            const fundraisers = await Fundraiser.aggregate([
                {
                    $lookup: {
                        from: 'donations',
                        localField: '_id',
                        foreignField: 'fundraiserId',
                        as: 'donations'
                    }
                }
            ]);
            return fundraisers;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getAllWithId(id) {
        try {
          const selectedFundraiser = await Fundraiser.aggregate([
            { $match: { _id: id } },
            {
              $lookup: {
                from: 'donations',
                localField: '_id',
                foreignField: 'fundraiserId',
                as: 'donations'
              }
            }
          ]);
          return selectedFundraiser[0]; // Return the first element since aggregate returns an array
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
      
}



module.exports = new FundraiserRepos();