import { useEffect, useState } from "react";
import { formatDate } from "./utils/helper.utils";
import {
  isProcessing,
  jobQueue,
  processQueue,
} from "./utils/async-queue.utils";
interface IJob {
  id: string;
  url: string;
  createdAt: string;
  duration: number;
}
export default function App() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch list of jobs
  const fetchJobs = async () => {
    const response = await fetch("http://localhost:3000/jobs");
    const data = await response.json();
    setJobs(data);
  };

  // Function to create a job and add it to the queue
  const createJob = async () => {
    setLoading(true);

    // Add a new job (a function) to the queue
    jobQueue.push(async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs", {
          method: "POST",
        });
        const job = await response.json();
        alert(
          `Job with id '${job.data.id}' will take: ${job.data.duration} seconds to complete`
        );
        fetchJobs();
      } catch (error) {
        console.error("Error creating job:", error);
      } finally {
        setLoading(false);
      }
    });

    // Process the queue if it's not already being processed
    if (!isProcessing) {
      processQueue();
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(() => {
      fetchJobs();
    }, 5000); // Poll every 5 seconds to check for updates
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", padding: 24 }}>
      <button
        onClick={() => createJob()}
        style={{
          background: "#282A36",
          color: "gold",
          padding: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          marginBottom: 12,
        }}
      >
        {loading ? "loading..." : "Create A Process"}
      </button>
      <ol>
        {jobs &&
          jobs?.map((job: IJob, index) => (
            <li key={job?.id}>
              {index + 1}: <span style={{ fontWeight: "700" }}>{job?.id}</span>:{" "}
              <span style={{ color: "orange" }}>
                {formatDate(job.createdAt)}
              </span>
              {job?.url && <img src={job.url} alt="Job Resolt" />}
            </li>
          ))}
      </ol>
    </div>
  );
}
