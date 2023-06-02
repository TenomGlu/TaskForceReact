import {
  GoogleMap,
  LoadScript,
  MarkerClustererF,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

// GOALS
// Create an animation that flips the map over into a table that can be used for the below step
// 1 - H
// 1. Add table below that allows selection by county, zip. Make sure the table is below the map
// 1. When a new submit is made, the center must be on or nearby the newly generated markers
// 2. Add InfoWindows to markers that show the site name and address
// 3. Add functionality to find nearest locations given a zip code
// 4. Center the main div
// 5. Change colors and add effects so when the page opens everything fades in from black and moves closer along the Z axis

const API_Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const style = {
  height: "30rem",
  width: "100%",
};

function MapComponent({ passedComp }: any) {
  const [userLocation, setUserLocation] = useState({
    lat: 1,
    lng: 1,
  });

  const locations = passedComp.map((val: { [x: string]: any }) => {
    let latlngList = {
      lat: val["Latitude"],
      lng: val["Longitude"],
      siteName: val["Site_Name"],
      address: val["Address_1"],
      city: val["City"],
      county: val["County"],
    };
    return latlngList;
  });

  console.log(locations);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  }, []);

  function createKey(location: { lat: any; lng: any }) {
    return location.lat + location.lng;
  }

  console.log(userLocation);

  return (
    <div className="theMap">
      <LoadScript googleMapsApiKey={API_Key}>
        <GoogleMap mapContainerStyle={style} zoom={5} center={userLocation}>
          <MarkerF position={userLocation} label={"You"} />
          <MarkerClustererF>
            {(clusterer) =>
              locations.map(
                (location: google.maps.LatLng | google.maps.LatLngLiteral) => (
                  <MarkerF
                    key={createKey(location)}
                    position={location}
                    clusterer={clusterer}
                  />
                )
              )
            }
          </MarkerClustererF>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
