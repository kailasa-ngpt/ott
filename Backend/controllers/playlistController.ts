import { Request, Response } from 'express';

export const getPlaylists = async (req: Request, res:Response) => {
    //GET DATA FROM DATABASE:
    res.status(200).json({
        success: true,
        data: 'All playlists'
    });
}