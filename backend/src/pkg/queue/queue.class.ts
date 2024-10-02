import { IJob } from "../jobs/job.type";

export class JobQueue {
  private static instance: JobQueue;
  private queue: IJob[] = [];

  // Method to return the singleton instance
  public static getInstance(): JobQueue {
    if (!JobQueue.instance) {
      JobQueue.instance = new JobQueue();
    }
    return JobQueue.instance;
  }
  // Add a job to the beginning of the queue
  addJob(job: IJob): void {
    this.queue.unshift(job);
    console.log(`Job ${job.id} added to the queue.`);
  }

  // Process the job queue
  async processQueue(processJob: (job: IJob) => void): Promise<void> {
    while (this.queue.length > 0) {
      // Peek the first job in the queue
      const currentJob = this.queue[0];
      const timeElapsed = (Date.now() - currentJob.createdAt.getTime()) / 1000;

      if (timeElapsed >= currentJob.duration) {
        // Process the job if duration has elapsed
        processJob(currentJob);
        this.queue.shift(); // Remove the processed job from the queue
      } else {
        // Move the job to the end if it's not yet completed
        this.queue.push(this.queue.shift() as IJob);
      }

      // Optional: Add a small delay between each processing cycle
      await this.delay(1000); // 1 second delay
    }

    console.log("All jobs processed, queue is now empty.");
  }

  // Helper function to delay the processing (simulate async behavior)
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
