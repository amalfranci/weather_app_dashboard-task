import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

//  for cors origin setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  import routes

import ApiRoutes from "./routes/api.js";

app.use("/api", ApiRoutes);

app.listen(PORT, () => {
  console.log(`Server coonect on ${PORT} success`);
});
