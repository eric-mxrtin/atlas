export const isLibraryOpen = (library, datetime) => {
  const day = datetime.toLocaleString('en-US', { weekday: 'long' });
  const currentTime = datetime.toTimeString().slice(0, 5); // "HH:mm" format

  const hoursToday = library.hours[day];

  if (!hoursToday || hoursToday.length !== 2) return false;

  const [start, end] = hoursToday;
  return currentTime >= start && currentTime <= end;
}
