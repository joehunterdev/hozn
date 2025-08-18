import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import authRoutes from "./routes/authRoutes";
import "./custom";


export const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Hozn Real Estate Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);

// تأكد من الاتصال بقاعدة البيانات عند تشغيل السيرفر
sequelize.sync().then(() => {
  console.log("Database connected!");
}).catch((error) => {
  console.error("Database connection failed:", error);
});
