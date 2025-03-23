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

// Get port from arguments or use default
const args = process.argv.slice(2);
let PORT = process.env.PORT || 4000;

// Check for custom port in arguments
const portArgIndex = args.indexOf('--port');
if (portArgIndex !== -1 && args.length > portArgIndex + 1) {
    PORT = parseInt(args[portArgIndex + 1], 10);
}

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
import apiRouter from './routes/api/index';
import cloudflareR2Routes from './routes/cloudflareR2Router';

// Mount routes
app.use("/api/v1/r2", cloudflareR2Routes);
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});