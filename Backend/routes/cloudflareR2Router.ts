import express from 'express';
import { uploadToR2, getFromR2 } from '../controllers/cloudFlareR2Controller';

const router = express.Router();

router.post('/upload', uploadToR2);
router.get('/file/:key', getFromR2);

export default router;