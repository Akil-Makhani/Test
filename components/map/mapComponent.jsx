import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { IoBedOutline } from "react-icons/io5";
import { FaWifi } from "react-icons/fa6";
import { PiBathtub } from "react-icons/pi";

const MapComponent = ({ property = [] }) => {
  const mapContainerStyle = {
    height: "620px",
    width: "100%",
    borderRadius: "25px",
    overflow: "hidden",
  };

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isGoogleDefined, setIsGoogleDefined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsGoogleDefined(typeof window.google !== "undefined");
    setIsLoading(false);
  }, []);

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={
        property.length > 0
          ? {
              lat: property[0]?.location?.coordinates[1],
              lng: property[0]?.location?.coordinates[0],
            }
          : { lat: 0, lng: 0 }
      }
    >
      {property?.map((prop) => (
        <Marker
          key={prop.id} // Use a unique property ID if available
          position={{
            lat: prop?.location?.coordinates[1],
            lng: prop?.location?.coordinates[0],
          }}
          onClick={() => setSelectedProperty(prop)}
        />
      ))}
      {selectedProperty && (
        <InfoWindow
          position={{
            lat: selectedProperty.location.coordinates[1],
            lng: selectedProperty.location.coordinates[0],
          }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div className="flex items-center rounded-[30px]">
            <figure className="m-0 w-28 h-28">
              <img
                src={`https://${selectedProperty?.photos?.[0]?.url}`}
                alt={selectedProperty.name}
                className="w-full object-cover h-full rounded-[20px]"
              />
            </figure>
            <figcaption className="flex-1 pl-4">
              <h2 className="text-sm font-bold truncate ... mb-1 w-36">
                {selectedProperty.name}
              </h2>
              <p className="text-[#9A9A9A] text-[12px] font-normal mb-3">{`${selectedProperty.distance} km from city center`}</p>
              <div className="flex items-center gap-4">
                <p className="mb-0 text-xs text-black flex items-center gap-1">
                  <FaWifi className="text-primary-blue text-base " /> Wi-Fi
                </p>
                <p className="mb-0 text-xs text-black flex items-center gap-1">
                  <IoBedOutline className="text-primary-blue text-base" /> 1 Bed
                </p>
                <p className="mb-0 text-xs text-black flex items-center gap-1">
                  <PiBathtub className="text-primary-blue text-base" /> Bathroom
                </p>
              </div>
            </figcaption>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );

  if (isLoading) {
    return <div>Loading map...</div>;
  }

  return isGoogleDefined ? (
    renderMap()
  ) : (
    <LoadScript googleMapsApiKey="AIzaSyBv_hPcDOPcrTfHnLrFNduHgJWDwv1pjfU">
      {renderMap()}
    </LoadScript>
  );
};

export default MapComponent;
