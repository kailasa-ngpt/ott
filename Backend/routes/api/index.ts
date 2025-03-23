import express from 'express';
import videoRoutes from './videos';
import playlistRoutes from './playlists';
import categoryRoutes from './categories';
import tagRoutes from './tags';

const router = express.Router();

// Mount routes
router.use('/videos', videoRoutes);
router.use('/playlists', playlistRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);

export default router; 