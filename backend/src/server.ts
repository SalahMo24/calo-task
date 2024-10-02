import express, { Application } from "express";
import jobRoutes from "./pkg/jobs/routes";
var cors = require("cors");

const app: Application = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client URL
  })
);

// Use job routes`
app.use("/jobs", jobRoutes);
app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
