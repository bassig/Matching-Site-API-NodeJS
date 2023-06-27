
const express = require('express');
const groupService = require('../services/groupService');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API endpoints for managing groups
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         groupGoal:
 *           type: number
 *           integer: true
 *         collected:
 *           type: number
 *           integer: true
 *         campaignId:
 *           type: number
 *           description: ID of the associated campaign
 *       required:
 *         - _id
 *         - name
 *         - groupGoal
 *         - campaignId
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Successfully retrieved all groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */

router.get('/', async (req, res, next) => {
    try {
        const allGroups = await groupService.getAll();
        res.json(allGroups);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the group
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully retrieved the group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const group = await groupService.getGroupById(id);
        res.json(group);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
