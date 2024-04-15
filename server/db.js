import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            // below are deprecated options: have no effect since Node.js Driver version 4.0.0
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('ERROR:', error);
        throw new Error('Unable to connect to MongoDB');
    }
};

export default connectDB;
