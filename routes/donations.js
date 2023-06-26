const express = require('express');
const donationService = require('../services/donationService');
const fundraiserService = require('../services/fundraiserService');
const router = express.Router();
const app=express();
const logger=require('../middlewares/donationLogger');

router.get('/', async (req, res, next) => {
    let allDonations = await donationService.getAll();
    res.json(allDonations);
})

router.post('/', async (req, res, next) => {
    try {
        const donationData = req.body;
        await donationService.createDonation(donationData);
        await fundraiserService.updateCollectedAmount(donationData.fundraiserId,donationData.amount)
        const middleware = logger(donationData);
        await middleware(req, res, next);
        res.status(201).json({ message: 'Donation created successfully' });
    } catch (error) {
        next(error);
    }
});


module.exports = router;