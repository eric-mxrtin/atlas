"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { Button } from "@/components/ui/button";
import { LocateIcon, RotateCw } from "lucide-react";

const Map = ({ data, coordinates, selectedCoordinates }) => {
  const DEFAULT_CENTER = [-79.397667, 43.662952];
  const DEFAULT_ZOOM = 15.71;
  const DEFAULT_PITCH = 52.25;
  const DEFAULT_BEARING = 36.85;

  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [pitch, setPitch] = useState(DEFAULT_PITCH);
  const [bearing, setBearing] = useState(DEFAULT_BEARING);
  const mapContainerRef = useRef();
  const mapRef = useRef();

  function getColorByStatus(status) {
    switch (status) {
      case "Open":
        return "h-2 w-2 rounded-full bg-green-400 shadow-[0px_0px_4px_2px_rgba(34,197,94,0.7)]";
      case "Closed":
        return "h-2 w-2 rounded-full bg-red-400 shadow-[0px_0px_4px_2px_rgba(239,68,68,0.9)]";
      default:
        return "w-2 h-2 rounded-full bg-gray-400";
    }
  }

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZTI0bWFydGkiLCJhIjoiY20zcXZ3YnZyMHZ0NDJyb2EwYmYwaTc2OSJ9.sF-Ud_ewdyqdrfxuuV_0ag";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center, // starting position [lng, lat]
      zoom: zoom, // starting zoom
      style: "mapbox://styles/e24marti/cm3rg3g0w000e01s97ypefiut",
      pitch: pitch,
      bearing: bearing,
    });

    mapRef.current.on("move", () => {
      if (mapRef.current) {
        const mapCenter = mapRef.current.getCenter();
        const mapZoom = mapRef.current.getZoom();
        const mapPitch = mapRef.current.getPitch();
        const mapBearing = mapRef.current.getBearing();

        setCenter([mapCenter.lng, mapCenter.lat]);
        setZoom(mapZoom);
        setPitch(mapPitch);
        setBearing(mapBearing);
      }
    });

    if (data.length > 0) {
      data.forEach((building) => {
        const el = document.createElement("div");
        el.className = getColorByStatus(building.status);

        if (mapRef.current && building.coords) {
          console.log(building.coords);
          new mapboxgl.Marker(el)
            .setLngLat([building.coords[1], building.coords[0]])
            .addTo(mapRef.current);
        }
      });
    }

    if (coordinates) {
      const userPos = document.createElement("div");
      userPos.className =
        "h-3 w-3 border-[1.5px] border-zinc-50 rounded-full bg-blue-400 shadow-[0px_0px_4px_2px_rgba(14,165,233,1)]";

      new mapboxgl.Marker(userPos)
        .setLngLat([coordinates[1], coordinates[0]])
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [data]);

  useEffect(() => {
    if (selectedCoordinates) {
      // Perform action, e.g., center the map or add a marker
      mapRef.current?.flyTo({
        center: [selectedCoordinates[1], selectedCoordinates[0]],
        zoom: DEFAULT_ZOOM + 2.5,
        pitch: DEFAULT_PITCH,
        bearing: DEFAULT_BEARING,
      });
    }
  }, [selectedCoordinates]);

  const handleMapReset = () => {
    mapRef.current.flyTo({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: DEFAULT_PITCH,
      bearing: DEFAULT_BEARING,
    });
  };

  const handleFlyToMe = () => {
    if (coordinates) {
      mapRef.current.flyTo({
        center: [coordinates[1], coordinates[0]],
        zoom: DEFAULT_ZOOM + 2,
        pitch: DEFAULT_PITCH,
        bearing: DEFAULT_BEARING,
      });
    }
  };

  return (
    <>
      <div className="h-full sm:w-full relative bg-red-500/0">
        <div ref={mapContainerRef} className="h-full" id="map-container" />
        <div className="top-8 right-6 absolute flex flex-col gap-3">
          <Button
            onClick={handleMapReset}
            variant="secondary"
            className="hover:scale-105 duration-100"
          >
            Reset Map <RotateCw size="14px" />
          </Button>
          <Button
            onClick={handleFlyToMe}
            variant="secondary"
            disabled={!coordinates}
            className="hover:scale-105 duration-100"
          >
            Fly to Me <LocateIcon size="14px" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Map;
