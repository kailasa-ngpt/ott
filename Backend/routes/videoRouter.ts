import express from 'express';
import { getVideos } from '../controllers/videoController';
const videoRouter = express.Router();

videoRouter.route("../controllers/videoController").get(getVideos);

export default videoRouter;