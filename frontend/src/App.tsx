import { useEffect, useState } from "react";
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

  // Create a new job
  const createJob = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/jobs", {
      method: "POST",
    });

    const job = await response.json();
    alert(
      `Job with id '${job.data.id}' will take: ${job.data.duration} seconds to complete`
    );
    setLoading(false);
    fetchJobs();
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

function formatDate(input: string) {
  // Parse the input string into a Date object
  const date = new Date(input);

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad to 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based), add 1, and pad to 2 digits
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  // Extract time components
  const hours = String(date.getHours()).padStart(2, "0"); // Get hours and pad to 2 digits
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes and pad to 2 digits
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Get seconds and pad to 2 digits

  // Format the date as dd-mm-yy HH:MM:SS
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
