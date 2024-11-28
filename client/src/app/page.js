"use client";
import { useState, useEffect } from "react";
import { fetchAndSortBuildings } from "../../services/distance";
import { isLibraryOpen } from "../../services/checkStatus";
import { ArrowDown, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Map from "./components/Map";
import Loader from "./components/Loader";
import BuildingCard from "./components/BuildingCard";
import AnimatedDateTime from "./components/DateTime";
import { filterBuildings, sortBuildings } from "../../services/operations";
import Logo from "./components/Logo";

export default function Home() {
  const DEFAULT_COORDINATES = [43.66159152142936, -79.39536144602623];
  const [coordinates, setCoordinates] = useState(null);
  const [sortedBuildings, setSortedBuildings] = useState([]);
  const [day, setDay] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Closest");
  const [filterOption, setFilterOption] = useState("All");
  const [displayedBuildings, setDisplayedBuildings] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    const updatedBuildings = filterBuildings(
      sortBuildings(sortedBuildings, sortOption),
      filterOption
    );
    setDisplayedBuildings(updatedBuildings);
  }, [sortOption, filterOption, sortedBuildings]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates([latitude, longitude]);
          },
          () => {
            // User denied location sharing, fallback to default coordinates
            setCoordinates(null);
            setSortOption("Name");
          }
        );
      } else {
        // Geolocation not supported, fallback to default coordinates
        setCoordinates(null);
        setSortOption("Name");
      }
    };

    getLocation();
  }, []);

  // Fetch data based on the coordinates
  useEffect(() => {
    const fetchData = async () => {
      const userCoords = coordinates || DEFAULT_COORDINATES;
      const sortedBuildings = await fetchAndSortBuildings(
        userCoords[0],
        userCoords[1]
      );

      // Update library statuses
      const current = new Date();
      setDay(current.toLocaleString("en-US", { weekday: "long" }));
      const updatedBuildings = sortedBuildings.map((building) => {
        const isOpen = isLibraryOpen(building, current);
        return { ...building, status: isOpen ? "Open" : "Closed" };
      });
      setSortedBuildings(updatedBuildings);
      setDisplayedBuildings(updatedBuildings);
    };

    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, "2000");
  }, [coordinates]);

  if (!loading) {
    return (
      <main className="relative h-screen text-white">
        {/* Fullscreen Map */}
        <Map
          data={sortedBuildings}
          className="absolute inset-0 w-full h-full"
          coordinates={coordinates}
          selectedCoordinates={selectedCoordinates} // Pass down
        />

        {/* Sidebar */}
        <div className="absolute border-r-[1px] border-neutral-600 bottom-0 left-0 right-0 h-[60%] sm:h-full sm:w-1/3 lg:w-1/4 bg-zinc-800/70 backdrop-blur-sm shadow-lg z-10 flex flex-col">
          {/* Header */}
          <div className="w-full  py-2 pl-4 sm:py-4 sm:pt-8 sm:pl-8 gap-4 hidden sm:flex flex-col">
            <Logo />

            <AnimatedDateTime />
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ArrowDown size="10px" /> {sortOption}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-neutral-900 text-white border-0"
                >
                  <DropdownMenuLabel>Sort By:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setSortOption("Closest")}
                    disabled={!coordinates}
                  >
                    Closest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOption("Furthest")}
                    disabled={!coordinates}
                  >
                    Furthest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOption("Highest Rated")}
                  >
                    Highest Rated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("Name")}>
                    Name
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ListFilter size="10px" /> {filterOption}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-neutral-900 text-white border-0"
                >
                  <DropdownMenuLabel>Filter By:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterOption("All")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterOption("Open")}>
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterOption("Closed")}>
                    Closed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Scrollable List */}
          <ScrollArea className="flex-grow overflow-y-auto ">
            <div className="block sm:hidden p-2">
              <Logo />
            </div>
            <div className="p-2 sm:p-4">
              {displayedBuildings.map((building, index) => (
                <BuildingCard
                  building={building}
                  coordinates={coordinates}
                  key={index}
                  day={day}
                  id={building.name}
                  isHighlighted={highlightedBuilding == building.name}
                  onClick={() => setSelectedCoordinates(building.coords)} // Pass building.coords
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    );
  } else {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
}
