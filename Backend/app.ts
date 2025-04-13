import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import connectDB from './config/db';
import path from 'path';

// Load environment variables first
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// Log warning if no origins are configured
if (corsOrigins.length === 0) {
  console.warn('No CORS origins configured. API may not be accessible from browsers.');
}
console.log('CORS origins:', corsOrigins);

app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like curl or mobile apps)
      if (!origin) return callback(null, true);
      // Check if the origin is allowed
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`Origin ${origin} not allowed by CORS policy`);
        return callback(null, true); // Still allow anyway for now - change to false for strict mode
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept', 'Range', 'If-None-Match'],
    exposedHeaders: ['Set-Cookie', 'Content-Length', 'Content-Range', 'Accept-Ranges']
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

// Import the stream proxy middleware
import { streamProxyRouter } from './middleware/streamProxy';

// Use the stream proxy middleware for /media paths
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

// Mount routes
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}`);
});