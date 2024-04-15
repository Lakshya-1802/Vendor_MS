import express from 'express';
import morgan from 'morgan';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import vendorRoutes from './routes/vendors.js';
import 'dotenv';
import authMiddleware from './middleware/auth.js';
import cors from 'cors'
const app = express();

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.json({ message: "App is Running" });
});
app.get('/protected',authMiddleware,(req,res)=>{
    return res.status(200).json({...req.user._doc})
})

// Use the authRoutes middleware with the correct path
app.use('/user', authRoutes);
app.use('/vendor', vendorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server Running at PORT: ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); 
    }
});
