export let jobQueue: any[] = [];
export let isProcessing = false; // Flag to check if the queue is currently being processed

export const checkBackendResponsive = async () => {
  const maxRetries = 5;
  const retryDelay = 2000; // 2 seconds between retries

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Try to fetch the backend health/status endpoint (or any lightweight check)
      const response = await fetch("http://localhost:3000/healthcheck", {
        method: "GET",
      });
      if (response.ok) {
        console.log("Backend is responsive.");
        return true; // Backend is responsive
      }
    } catch (error) {
      console.error(
        `Attempt ${attempt} failed. Backend is not responsive. Retrying...`
      );
      if (attempt === maxRetries) {
        alert("The backend is not responsive. Please try again later.");
        return false; // Backend is unresponsive after max retries
      }
    }
    // Wait before the next retry
    await new Promise((resolve) => setTimeout(resolve, retryDelay));
  }
  return false;
};

// Function to process the job queue
export const processQueue = async () => {
  if (isProcessing) return; // Prevent multiple parallel queue processing
  isProcessing = true;

  // First, check if the backend is responsive
  const backendResponsive = await checkBackendResponsive();
  if (!backendResponsive) {
    isProcessing = false;
    return; // Stop processing if backend is not responsive
  }

  // Process each job in the queue sequentially
  while (jobQueue.length > 0) {
    const job = jobQueue.shift(); // Get the first job from the queue
    await job(); // Execute the job (which is a function that returns a Promise)
  }

  isProcessing = false;
};
