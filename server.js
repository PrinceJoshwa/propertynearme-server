import express from "express"
// import mongoose from "mongoose"
import cors from "cors"
import morgan from 'morgan';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js"
import propertyRoutes from "./routes/propertyRoutes.js"

dotenv.config()

connectDB();

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
// app.use(cors({
//   origin: [
//     process.env.CLIENT_URL,
//     'http://localhost:5173',
//     'https://propertynearme-client.vercel.app'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));


app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json())
app.use(morgan('dev'));

// Routes
app.use("/api/users", userRoutes)
app.use("/api/properties", propertyRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


// const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
