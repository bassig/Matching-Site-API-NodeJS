
const express = require('express');
const fundraiserService = require('../services/fundraiserService');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Fundraisers
 *   description: API endpoints for managing fundraisers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Fundraiser:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         name:
 *           type: string
 *         goal:
 *           type: number
 *           integer: true
 *         collectedAmount:
 *           type: number
 *           integer: true
 *         groupId:
 *           type: number
 *           description: ID of the associated group
 *       required:
 *         - _id
 *         - name
 *         - goal
 *         - groupId
 */

/**
 * @swagger
 * /api/fundraisers:
 *   get:
 *     summary: Get all fundraisers
 *     tags: [Fundraisers]
 *     responses:
 *       200:
 *         description: Successfully retrieved all fundraisers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fundraiser'
 */

router.get('/', async (req, res, next) => {
  try {
    const allFundraisers = await fundraiserService.getAll();
    res.json(allFundraisers);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/fundraisers/{id}:
 *   get:
 *     summary: Get a fundraiser by ID
 *     tags: [Fundraisers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the fundraiser
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully retrieved the fundraiser
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fundraiser'
 */

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const fundraiser = await fundraiserService.getFundraiserById(id);
    res.json(fundraiser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/fundraisers/{id}:
 *   put:
 *     summary: Update the goal of a fundraiser
 *     tags: [Fundraisers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the fundraiser
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: number
 *                 integer: true
 *             required:
 *               - goal
 *     responses:
 *       200:
 *         description: Fundraiser goal updated successfully
 */

router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { goal } = req.body;
    const updatedFundraiser = await fundraiserService.updateGoal(id, goal);
    res.json(updatedFundraiser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
