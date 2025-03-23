import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

// Add these lines before your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 4000;

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Redirect root to API docs
app.get('/', (req: Request, res: Response) => {
    res.redirect('/api-docs');
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
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});