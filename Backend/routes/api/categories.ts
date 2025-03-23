import express from 'express';
import * as categoryController from '../../controllers/categoryController';

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Get a single category
 *     description: Retrieves a category by its ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/:categoryId', categoryController.getCategory);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories:
 *   get:
 *     summary: Get subcategories
 *     description: Retrieves all subcategories of a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The parent category ID
 *     responses:
 *       200:
 *         description: List of subcategories retrieved successfully
 *       404:
 *         description: Parent category not found
 *       500:
 *         description: Server error
 */
router.get('/:categoryId/subcategories', categoryController.getSubcategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the provided data
 *     tags: [Categories]
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
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *               parentId:
 *                 type: string
 *                 description: ID of parent category (if this is a subcategory)
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Server error
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     summary: Update a category
 *     description: Updates a category with the provided data
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *               parentId:
 *                 type: string
 *                 description: ID of parent category (if this is a subcategory)
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.put('/:categoryId', categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/:categoryId', categoryController.deleteCategory);

export default router;
