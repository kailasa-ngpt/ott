import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import connectDB from './config/db';
import path from 'path';
import videoRoutes from './routes/api/videos';

// Load environment variables first
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000', 'https://ott-frontend.koogle.sk'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

// Connect to MongoDB
connectDB();

// Get port from arguments or use default
const args = process.argv.slice(2);
let PORT = process.env.PORT || 4000;

// Check for custom port in arguments
const portArgIndex = args.indexOf('--port');
if (portArgIndex !== -1 && args.length > portArgIndex + 1) {
    PORT = parseInt(args[portArgIndex + 1], 10);
}

// Setup Swagger at root URL
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerSpec));

// Also keep /api-docs route for backward compatibility
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

// Provide swagger.json endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// proxy middleware routes
import { streamProxyRouter } from './middleware/streamProxy';
app.use('/media', streamProxyRouter);

// a simple endpoint for checking if videos exist
app.head('/media/:videoId/*', (req, res) => {
  const videoId = req.params.videoId;
  // You could check if the video exists in your database here
  // For now, just return a success response
  res.status(200).send();
});

// Import routes
import apiRouter from './routes/api/index';
import cloudflareR2Routes from './routes/cloudflareR2Router';

// Mount routes
app.use("/api", apiRouter);
// Remove the duplicate video routes since they're already included in apiRouter
// app.use('/api/videos', videoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}`);
});