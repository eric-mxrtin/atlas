import React, { useState, useEffect } from "react";

const AnimatedDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Format the date and time
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = {
    hours: dateTime.getHours() % 12 || 12, // Convert to 12-hour format
    minutes: String(dateTime.getMinutes()).padStart(2, "0"),
    seconds: String(dateTime.getSeconds()).padStart(2, "0"),
    meridiem: dateTime.getHours() >= 12 ? "PM" : "AM",
  };

  return (
    <div className="text-md text-white font-medium">
      <p>
        {formattedDate}{" "}
        {formattedTime.hours}:{formattedTime.minutes}:
        {formattedTime.seconds} {formattedTime.meridiem}{" "}
      </p>
    </div>
  );
};

export default AnimatedDateTime;
