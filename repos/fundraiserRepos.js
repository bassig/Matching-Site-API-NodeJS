const db = require('../models/db');
const Fundraiser = require('../models/fundraiser');

class FundraiserRepos {
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
  async getFundraiserById(id) {
    try {
      const fundraiser = await Fundraiser.aggregate([
        {
          $match: { _id: id }
        },
        {
          $lookup: {
            from: 'donations',
            localField: '_id',
            foreignField: 'fundraiserId',
            as: 'donations'
          }
        }
      ]);

      if (!fundraiser || fundraiser.length === 0) {
        throw new Error('Fundraiser not found');
      }

      return fundraiser[0];
    } catch (error) {
      throw new Error(`Failed to get fundraiser: ${error.message}`);
    }
  }

  async updateGoal(id, newGoal) {
    try {
      const fundraiser = await Fundraiser.findByIdAndUpdate(
        id,
        { $set: { goal: newGoal } },
        { new: true }
      );
      return { "new goal": newGoal };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCollectedAmount(id, donationAmount) {
    try {
      const fundraiser = await Fundraiser.findOne({ _id: id });
      if (!fundraiser) {
        throw new Error('Fundraiser not found');
      }
      fundraiser.collectedAmount += donationAmount;
      await fundraiser.save();
    } catch (error) {
      throw new Error(`Failed to update collected amount: ${error.message}`);
    }
  }






}



module.exports = new FundraiserRepos();