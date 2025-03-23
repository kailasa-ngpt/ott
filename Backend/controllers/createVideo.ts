import { Request, Response } from 'express';
import { videoService } from '../services/videoService';

// Create a new video
export const createVideo = async (req: Request, res: Response) => {
    try {
        const video = await videoService.createVideo(req.body);
        
        res.status(201).json({
            success: true,
            data: video
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}; 