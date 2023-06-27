const db = require('../models/db');
const Donation = require('../models/donation');

class DonationRepos {

    async getAll() {
        return await Donation.find({});
    }
    async createDonation(donation) {
        try {
            await Donation.create(donation);
        } catch (err) {
            console.log('Error::' + err);
            throw err
        }
    }
}

module.exports = new DonationRepos();