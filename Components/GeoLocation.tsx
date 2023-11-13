// I've used the browsers geolocation api to get the users location to avoid API key for google maps
// In the real world I would use the google maps api to get the users location then backfill the city and country fields using Lat and Long

import React, { useState, useEffect } from "react";
import Dropdown from "./DropDown";

interface Location {
  latitude: number;
  longitude: number;
}

interface GeoLocationProps {
  onLocationSelect: (
    selectedLocation: string,
    latitude: number,
    longitude: number
  ) => void;
}

const GeoLocation: React.FC<GeoLocationProps> = ({ onLocationSelect }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   Safely handling if geolocating is not supported by the browser
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  //   passing data {City, Lat and Long} to SignUpForm.tsx
  const handleDropdownChange = (value: string) => {
    setSelectedLocation(value);
    if (location) {
      onLocationSelect(value, location.latitude, location.longitude);
    }
  };

  return (
    <div>
      {location ? (
        <div>
          <Dropdown
            id="location"
            label="Select location"
            options={["London", "Paris", "NewYork", "Sydney"]}
            // Send to parent
            onChange={handleDropdownChange}
          />

          <div
            className="
            mt-2
            flex
            justify-center
            form-input
            gap-2
            w-full 
            rounded-md 
            border-0 
            p-2
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-200 
            sm:text-xs 
            mb-6
            "
          >
            {/* geoloaction browser api */}
            <p>Latitude: {location.latitude}</p>
            <br />
            <p>Longitude: {location.longitude}</p>
          </div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p
          className="
            mt-2
            flex
            justify-center
            form-input
            gap-2
            w-full 
            rounded-md 
            border-0 
            p-2
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-200 
            sm:text-xs 
            mb-6
            "
        >
          {/* handle loading state */}
          Calculating your location...
        </p>
      )}
    </div>
  );
};

export default GeoLocation;
