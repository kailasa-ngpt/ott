import express from 'express';
import { getVideo } from '../controllers/videoController';
const videoRouter = express.Router();

videoRouter.route('/:videoId').get(getVideo);

export default videoRouter;