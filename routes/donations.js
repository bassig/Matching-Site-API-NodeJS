
const express = require('express');
const donationService = require('../services/donationService');
const fundraiserService = require('../services/fundraiserService');
const groupService = require('../services/groupService');
const campaignService = require('../services/campaignService');
const router = express.Router();
const app = express();
const logger = require('../middlewares/donationLogger');

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: API endpoints for managing donations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         donorName:
 *           type: string
 *         amount:
 *           type: number
 *           integer: true
 *         message:
 *           type: string
 *         fundraiserId:
 *           type: number
 *           description: ID of the associated fundraiser
 *       required:
 *         - _id
 *         - donorName
 *         - amount
 *         - fundraiserId
 */

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: Successfully retrieved all donations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donation'
 */

router.get('/', async (req, res, next) => {
    try {
        const allDonations = await donationService.getAll();
        res.json(allDonations);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create a new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donation'
 *     responses:
 *       201:
 *         description: Donation created successfully
 */

router.post('/', async (req, res, next) => {
    try {
        const donationData = req.body;
        await donationService.createDonation(donationData);

        // Update collected amount for fundraiser
        await fundraiserService.updateCollectedAmount(donationData.fundraiserId, donationData.amount);

        // Update collected amount for group
        const fundraiser = await fundraiserService.getFundraiserById(donationData.fundraiserId);
        await groupService.updateCollectedAmount(fundraiser.groupId, donationData.amount);

        // Update collected amount for campaign
        const group = await groupService.getGroupById(fundraiser.groupId);
        await campaignService.updateCollectedAmount(group.campaignId, donationData.amount);

        const middleware = logger(donationData);
        await middleware(req, res, next);
        res.status(201).json({ message: 'Donation created successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
