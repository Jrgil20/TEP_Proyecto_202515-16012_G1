// This file defines the API routes and their corresponding controller functions
// It also includes Swagger documentation for each endpoint (Requirement: API documentation)

import express from 'express';
import * as jokeController from '../controllers/jokeController';

const router = express.Router();

/**
 * @swagger
 * /api/jokes/{type}:
 *   get:
 *     summary: Get a joke by type (Requirement 1)
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Chuck, Dad, Propio]
 *     responses:
 *       200:
 *         description: Returns a joke
 *       400:
 *         description: Invalid joke type
 *       404:
 *         description: No jokes found
 *       500:
 *         description: Server error
 */
router.get('/jokes/:type', jokeController.getJoke);


export default router;