const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const asyncHandler = require('../utils/async.handler');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for auth module
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login into the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Invalid credentials
 */
router.post('/login', asyncHandler(authController.login));

module.exports = router;