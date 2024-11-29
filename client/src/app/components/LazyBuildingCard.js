import { useState, useEffect, useRef } from "react";
import BuildingCard from "./BuildingCard";

const LazyBuildingCard = ({ building, day, onClick, coordinates, id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[100px]">
      {isVisible && (
        <BuildingCard
          building={building}
          day={day}
          coordinates={coordinates}
          onClick={onClick}
          id={id}
        />
      )}
    </div>
  );
};

export default LazyBuildingCard;
