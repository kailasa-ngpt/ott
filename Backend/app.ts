import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
}));

dotenv.config({ path: './config.env' });

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

// Import routes
import apiRouter from './routes/api/index';
import cloudflareR2Routes from './routes/cloudflareR2Router';

// Mount routes
// Temporarily disable R2 routes
// app.use("/api/v1/r2", cloudflareR2Routes);
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}`);
});