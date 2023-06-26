const express = require('express');
const campaignService = require('../services/campaignService');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    let campaign = await campaignService.getCampaign(req.params.id);
    res.json(campaign);
})

router.post('/', async (req, res, next) => {
    try {
        const campaignData = req.body;
        await campaignService.createCampaign(campaignData);
        res.status(201).json({ message: 'campaign created successfully' });
    } catch (error) {
        next(error);
    }
});

router.put('/:id/:isManager',async(req,res,next)=>{
    campaignService.updateGoal(req.params.id,req.body.campaignGoal,req.params.isManager).then(data => res.json(data));
  })


module.exports = router;