export const isLibraryOpen = (library, datetime) => {
  const day = datetime.toLocaleString('en-US', { weekday: 'long' });
  const currentTime = datetime.getHours() * 60 + datetime.getMinutes(); // Get time in minutes

  const hoursToday = library.hours[day];

  if (!hoursToday || hoursToday.length !== 2) return false;

  const [start, end] = hoursToday;
  if (start === "00:00" && end === "24:00") {
    return true; // Open 24 hours
  }

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startTime = startHour * 60 + startMinute; // Convert start time to minutes
  const endTime = endHour * 60 + endMinute; // Convert end time to minutes

  return currentTime >= startTime && currentTime <= endTime;
};
