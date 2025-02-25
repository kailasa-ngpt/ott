import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

// Add these lines before your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

//IMPORT ROUTES:
import videoRoutes from './routes/videoRouter';
import playlistRoutes from './routes/playlistRouter';
import cloudflareR2Routes from './routes/cloudflareR2Router';
app.use("/api/v1/r2", cloudflareR2Routes);
app.use("/api/v1", videoRoutes);
app.use("api/v1", playlistRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});