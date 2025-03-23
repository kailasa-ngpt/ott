import express from 'express';
import * as tagController from '../../controllers/tagController';

const router = express.Router();

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Get all tags
 *     description: Retrieves a list of all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of tags retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', tagController.getAllTags);

/**
 * @swagger
 * /api/tags/{tagId}:
 *   get:
 *     summary: Get a single tag
 *     description: Retrieves a tag by its ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag retrieved successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */
router.get('/:tagId', tagController.getTag);

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a new tag
 *     description: Creates a new tag with the provided data
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the tag
 *               description:
 *                 type: string
 *                 description: Description of the tag
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       500:
 *         description: Server error
 */
router.post('/', tagController.createTag);

/**
 * @swagger
 * /api/tags/{tagId}:
 *   put:
 *     summary: Update a tag
 *     description: Updates a tag with the provided data
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the tag
 *               description:
 *                 type: string
 *                 description: Description of the tag
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */
router.put('/:tagId', tagController.updateTag);

/**
 * @swagger
 * /api/tags/{tagId}:
 *   delete:
 *     summary: Delete a tag
 *     description: Deletes a tag by its ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */
router.delete('/:tagId', tagController.deleteTag);

export default router;
