import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/mydatabase';
    console.log('Attempting to connect to MongoDB...', mongoURI);
    
    const connectWithRetry = async (retryCount = 5, delay = 5000): Promise<void> => {
        try {
            await mongoose.connect(mongoURI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (error: any) {
            console.error('MongoDB Connection Error:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                code: error.code
            });
            
            if (retryCount > 0) {
                console.log(`Retrying connection in ${delay/1000} seconds... (${retryCount} attempts left)`);
                setTimeout(() => connectWithRetry(retryCount - 1, delay), delay);
            } else {
                console.error('Maximum retry attempts reached. Exiting...');
                process.exit(1);
            }
        }
    };

    await connectWithRetry();
};

export default connectDB;