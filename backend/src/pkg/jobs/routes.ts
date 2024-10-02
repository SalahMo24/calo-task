import express from "express";
import { getAllJobs, getJob, createNewJob } from "./controller";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", createNewJob);

export default router;
