import { Request, Response } from 'express';
import { videoService } from '../services/videoService';

export const getVideo = async (req: Request, res: Response) => {
    try {
        console.log('Received request for videoId:', req.params.videoId); // Debug log
        const video = await videoService.getVideo(req.params.videoId);
        
        console.log('Sending response:', video); // Debug log
        res.status(200).json({
            success: true,
            data: video
        });
    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}