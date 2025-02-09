import express from 'express';
import { getPlaylists } from '../controllers/playlistController';
const playlistRouter = express.Router();

playlistRouter.route("../controllers/playlistController").get(getPlaylists);

export default playlistRouter;