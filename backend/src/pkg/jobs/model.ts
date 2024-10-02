import { read, write } from "../file-handler";
import { JobQueue } from "../queue/queue.class";
import { IJob } from "./job.type";
import { randomUUID } from "crypto";

const queue = JobQueue.getInstance();

export const getJobs = () => {
  const jobs = read();
  return jobs;
};

export const getJobById = (id: number) => {
  return null;
};
export const createJob = () => {
  const jobId = randomUUID();
  const delay = Math.floor(Math.random() * 12) * 5 + 5; // Delay between 5 and 60 seconds
  const job: IJob = {
    duration: delay,
    id: jobId,
    createdAt: new Date(),
    url: "",
  };
  queue.addJob(job);
  queue.processQueue(saveJob);
  return job;
};

export const saveJob = (job: IJob) => {
  try {
    write(job);
  } catch (e) {
    console.log(e);
  }
};
