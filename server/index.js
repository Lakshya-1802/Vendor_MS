import express from 'express';
import morgan from 'morgan';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import vendorRoutes from './routes/vendors.js';
import dotenv from 'dotenv';
import authMiddleware from './middleware/auth.js';
import cors from 'cors'
import passport from './utils/passport.js';
import googleAuth from './routes/googleAuth.js'
const app = express();

dotenv.config()

// middleware
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','https://vendor-management-system-xi.vercel.app')
    // res.header('Access-Control-Allow-Origin','http://localhost:3000')
    next()
})
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({
    origin:['http://localhost:3000','http://192.168.1.14:3000','https://vendor-management-system-xi.vercel.app'], 
    methods:'GET,POST,PATCH,DELETE,PUT',
    credentials:true, 
}));
passport(app)


// routes
app.get('/', (req, res) => {
    res.json({ message: "App is Running" });
});
app.get('/protected',authMiddleware,(req,res)=>{
    return res.status(200).json({...req.user._doc})
})

// Use the authRoutes middleware with the correct path
app.use('/user', authRoutes);
app.use('/auth', googleAuth);
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
