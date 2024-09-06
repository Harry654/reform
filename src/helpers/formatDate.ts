export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Handles 11th, 12th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(day)} ${month}`;
}
