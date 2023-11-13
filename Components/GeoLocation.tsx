import React, { useState, useEffect } from 'react';
import Dropdown from './DropDown';

interface Location {
  latitude: number;
  longitude: number;
}

const GeoLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
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
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div>
      {location ? (

        <div>
        <Dropdown
        id="location"
        label="Select location"
        options={[
            "London",
            "Paris",
            "NewYork",
            "Sydney",
        ]}
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
        
          <p>Latitude: {location.latitude}</p>
          <br />
          <p>Longitude: {location.longitude}</p>
        </div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Calculating your location...</p>
      )}
    </div>
  );
};

export default GeoLocation;