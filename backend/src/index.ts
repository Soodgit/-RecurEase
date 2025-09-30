import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "RecurEase backend running!" });
});

// Default Root Endpoint (optional, nice for quick server check)
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to RecurEase API!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
