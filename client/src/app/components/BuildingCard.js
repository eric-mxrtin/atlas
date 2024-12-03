import React from "react";
import { formatTime } from "../../../services/formatTime";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Clock, Star, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "../globals.css";
import { convertToIdFormat } from "../../../services/formatId";

const BuildingCard = ({ building, day, coordinates, onClick }) => {
  const { name, hours, distance, status, rating, station, image, id } =
    building;
  return (
    <div
      className={`flex border-[1px] border-neutral-600 hover:border-neutral-200 mb-4 cursor-pointer hover:bg-gray-100/10 duration-100 flex-col sm:gap-3 gap-1 sm:p-4 p-2 rounded-lg mr-4`}
      onClick={onClick}
      id={convertToIdFormat(name)}
    >
      <div className="sm:h-[150px] h-[120px] relative">
        <Image
          src={image}
          alt={name}
          fill={true}
          quality={5}
          style={{ objectFit: "cover" }} // Crops the image to fit the specified dimensions
          className="rounded-lg"
        />
      </div>

      <div className="flex justify-between">
        <div className="flex items-center">
          <h2 className="font-semibold">{name}</h2>
        </div>

        <div className="inline-flex gap-2 text-sm items-center">
          <Star size="16px" fill="#F3C623" />
          {rating}
        </div>
      </div>

      <div className="text-xs sm:text-sm inline-flex gap-2 items-center">
        <Clock size="16px" strokeWidth={2.5} />
        <div className="inline-flex gap-1 items-center">
          {status === "Open" ? (
            <p className="text-emerald-400 font-black">Open</p>
          ) : (
            <p className="text-rose-400 font-black">Closed</p>
          )}
          {status === "Open"
            ? hours[day][0] === "00:00" && hours[day][1] === "24:00"
              ? " for 24 hours"
              : ` until ${formatTime(hours[day][1])}`
            : hours[day].length > 0
            ? ""
            : " today"}
        </div>
      </div>
      <div className="text-xs sm:text-sm text-sm font-medium inline-flex gap-2 items-center">
        <TrainFront size="16px" strokeWidth={2.5} />
        {station} Station
      </div>

      <div className="inline-flex gap-2 items-center justify-between">
        <p className="text-lg font-semibold">
          {coordinates ? distance.toFixed(2) : "-"} km{" "}
          <span className="font-light text-sm">away</span>
        </p>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="inline-flex gap-1"
              variant="ghost"
              onClick={(e) => e.stopPropagation()}
            >
              View Hours <ChevronDown size="16px" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="bg-neutral-900 text-white border-0"
          >
            {" "}
            <ul className="flex flex-col gap-2">
              {Object.entries(hours).map(([day_, times], i) => (
                <li
                  key={i}
                  className={`flex justify-between text-sm ${
                    day == day_ ? "!font-bold" : ""
                  }`}
                >
                  <span>{day_}:</span>
                  <div>
                    {times.length > 0
                      ? `${formatTime(times[0])} - ${formatTime(times[1])}`
                      : "Closed"}
                  </div>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BuildingCard;
