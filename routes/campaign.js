
const express = require('express');
const campaignService = require('../services/campaignService');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: API endpoints for managing campaigns
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         campaignName:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *         campaignGoal:
 *           type: number
 *           integer: true
 *         collected:
 *           type: number
 */

/**
 * @swagger
 * /api/campaign/{id}:
 *   get:
 *     summary: Get campaign by ID
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the campaign to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the campaign
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 */

router.get('/:id', async (req, res, next) => {
    try {
        const campaign = await campaignService.getCampaigById(req.params.id);
        res.json(campaign);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/campaign:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaigns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       201:
 *         description: Campaign created successfully
 */

router.post('/', async (req, res, next) => {
    try {
        const campaignData = req.body;
        await campaignService.createCampaign(campaignData);
        res.status(201).json({ message: 'Campaign created successfully' });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/campaign/{id}/{isManager}:
 *   put:
 *     summary: Update campaign goal
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the campaign to update
 *       - in: path
 *         name: isManager
 *         schema:
 *           type: string
 *         required: true
 *         description: Manager identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               campaignGoal:
 *                 type: number
 *                 integer: true
 *             required:
 *               - campaignGoal
 *     responses:
 *       200:
 *         description: Campaign goal updated successfully
 */

router.put('/:id/:isManager', async (req, res, next) => {
    try {
        const { id, isManager } = req.params;
        const campaignGoal = req.body.campaignGoal;
        await campaignService.updateGoal(id, campaignGoal, isManager);
        res.json({ message: 'Campaign goal updated successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

