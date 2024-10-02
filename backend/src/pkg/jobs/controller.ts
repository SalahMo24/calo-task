import { Request, Response } from "express";
import { getJobs, getJobById, createJob } from "./model";

export const getAllJobs = (req: Request, res: Response): void => {
  const jobs = getJobs();
  res.status(200).json(jobs);
};

export const getJob = (req: Request, res: Response): void => {
  const jobId = parseInt(req.params.id);
  const job = getJobById(jobId);

  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
};

export const createNewJob = (req: Request, res: Response): void => {
  res.status(200).json({ data: createJob() });
};
