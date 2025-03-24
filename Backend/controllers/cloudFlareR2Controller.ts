/*
import { Request, Response } from 'express';
import { uploadFile, getFile } from '../services/cloudflareR2Service';

export const uploadToR2 = async (req: Request, res: Response) => {
  const { key, body } = req.body;

  try {
    const data = await uploadFile(key, body);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
    });
  }
};

export const getFromR2 = async (req: Request, res: Response) => {
  const { key } = req.params;

  try {
    const data = await getFile(key);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting file',
    });
  }
};
*/

// This functionality is not being used currently
// Will be implemented in the future when needed
export const uploadToR2 = async (req: any, res: any) => {
  res.status(501).json({
    success: false,
    message: 'Not implemented yet',
  });
};

export const getFromR2 = async (req: any, res: any) => {
  res.status(501).json({
    success: false,
    message: 'Not implemented yet',
  });
};