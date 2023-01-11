import { Container, Loader, Space } from "@mantine/core";
import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import "../styles/map.css";
import {
  closeOptions,
  farOptions,
  middleOptions,
} from "../styles/mapPageStyles";
import DistanceInfo from "./DistanceInfo";
import Places from "./Places";

const libraries = ["places"];

const MapPage = () => {
  const google = window.google;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 57.7089, lng: 11.9746 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "2d7ad115aac7539a",
    }),
    []
  );

  const [office, setOffice] = useState();
  const [directions, setDirections] = useState();

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const generateHouses = (position) => {
    const _houses = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -5 : 5;
      _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _houses;
  };

  const fetchDirections = (house) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  const houses = useMemo(() => generateHouses(center), [center]);

  if (!isLoaded) return <Loader />;

  return (
    <Container mt="md">
      <Places
        setOffice={(position) => {
          setOffice(position);
          mapRef.current && mapRef.current.panTo(position);
        }}
      />

      {directions && <DistanceInfo leg={directions.routes[0].legs[0]} />}
      <Space h="sm" />
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="mapContainer"
        options={options}
        onLoad={onLoad}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}
          />
        )}

        {office && (
          <>
            <Marker position={office} />

            <MarkerClusterer>
              {(clusterer) =>
                houses &&
                houses.map((house) => (
                  <Marker
                    key={house.lat}
                    position={house}
                    clusterer={clusterer}
                    onClick={() => {
                      fetchDirections(house);
                    }}
                  />
                ))
              }
            </MarkerClusterer>
            <Circle center={office} radius={5000} options={closeOptions} />
            <Circle center={office} radius={10000} options={middleOptions} />
            <Circle center={office} radius={15000} options={farOptions} />
          </>
        )}
      </GoogleMap>
    </Container>
  );
};
export default MapPage;
