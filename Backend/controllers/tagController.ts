import { Request, Response } from 'express';
import { tagService } from '../services/tagService';

// Get all tags
export const getAllTags = async (req: Request, res: Response): Promise<void> => {
    try {
        const tags = await tagService.getAllTags();
        
        res.status(200).json({
            success: true,
            count: tags.length,
            data: tags
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get a single tag
export const getTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const tag = await tagService.getTag(req.params.tagId);
        
        res.status(200).json({
            success: true,
            data: tag
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Tag not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create a new tag
export const createTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const tag = await tagService.createTag(req.body);
        
        res.status(201).json({
            success: true,
            data: tag
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update a tag
export const updateTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const tag = await tagService.updateTag(
            req.params.tagId, 
            req.body
        );
        
        res.status(200).json({
            success: true,
            data: tag
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Tag not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete a tag
export const deleteTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await tagService.deleteTag(req.params.tagId);
        
        if (!success) {
            res.status(404).json({
                success: false,
                error: 'Tag not found'
            });
            return;
        }
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}; 