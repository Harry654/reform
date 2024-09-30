export function getDateISO(days_offset: number): string {
  const today = new Date();

  // Add 14 days to the current date
  today.setDate(today.getDate() + days_offset);

  // Convert the date to ISO format and ensure it ends with 'Z' for UTC
  return today.toISOString(); // Returns in the format YYYY-MM-DDTHH:mm:ss.sssZ
}
