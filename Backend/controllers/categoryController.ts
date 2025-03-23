import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

// Get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories();
        
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get a single category
export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await categoryService.getCategory(req.params.categoryId);
        
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Category not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get subcategories of a category
export const getSubcategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getChildCategories(req.params.categoryId);
        
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await categoryService.createCategory(req.body);
        
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update a category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await categoryService.updateCategory(
            req.params.categoryId, 
            req.body
        );
        
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Category not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await categoryService.deleteCategory(req.params.categoryId);
        
        if (!success) {
            res.status(404).json({
                success: false,
                error: 'Category not found'
            });
            return;
        }
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('has subcategories')) {
            res.status(400).json({
                success: false,
                error: 'Cannot delete category with subcategories'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}; 