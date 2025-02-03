import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

//IMPORT ROUTES:
import videoRoutes from './routes/videoRouter';
app.use("api/v1", videoRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});