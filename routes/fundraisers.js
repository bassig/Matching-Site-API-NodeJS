const express = require('express');
const fundraiserService = require('../services/fundraiserService');
const router = express.Router();

router.get('/', async (req, res, next) => {
    let allFundraisers = await fundraiserService.getAll();
    res.json(allFundraisers);
})

router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const selectedFundraiser = await fundraiserService.getById(id);
      res.json(selectedFundraiser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/:id',async(req,res,next)=>{
    fundraiserService.updateGoal(req.params.id,req.body.goal).then(data => res.json(data));
  })
  

module.exports = router;