import express from "express";
import { connectDB } from "./database.js";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/userRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/api", router);
app.use("/api", postRouter);

const PORT = process.env.PORT || 8000;
const URI = process.env.MONGO_URI;

app.get("/", (req, res) => res.send("Abhinav....."));

connectDB(URI);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
