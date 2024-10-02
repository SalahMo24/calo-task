import { IJob } from "../jobs/job.type";
import fs from "fs";

const JOB_FILE = "./jobs.json";

// Read jobs from file
export function read() {
  try {
    const data = fs.readFileSync(JOB_FILE, "utf8");
    const items: IJob[] = JSON.parse(data);
    return items;
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return [];
  }
}

// Write jobs to file
export function write(job: IJob) {
  try {
    // Read the current items from the file
    const items = read();

    // Append the new item to the list
    items.push(job);

    // Convert the updated array back to JSON
    const updatedData = JSON.stringify(items, null, 2);

    // Write the updated JSON back to the file
    fs.writeFileSync(JOB_FILE, updatedData);

    return job;
  } catch (err) {
    console.error("Error appending to JSON file:", err);
  }
}
