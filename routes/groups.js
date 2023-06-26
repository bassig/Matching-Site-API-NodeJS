const express = require('express');
const groupService = require('../services/groupService');
const router = express.Router();

router.get('/', async (req, res, next) => {
    let allGroups = await groupService.getAll();
    res.json(allGroups);
})

module.exports = router;