export function formatDate(input: string) {
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
