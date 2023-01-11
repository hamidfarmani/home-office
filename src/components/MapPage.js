import { Container, Loader } from "@mantine/core";
import {
  Circle,
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
import Places from "./Places";

const libraries = ["places"];

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 57.7089, lng: 11.9746 }), []);
  const options = useMemo(
    () => ({ disableDefaultUI: true, clickableIcons: false }),
    []
  );

  const [office, setOffice] = useState();

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

  const houses = useMemo(
    () => generateHouses(office ? office : center),
    [center, office]
  );

  if (!isLoaded) return <Loader />;

  return (
    <Container mt="md">
      <Places
        setOffice={(position) => {
          setOffice(position);
          mapRef.current && mapRef.current.panTo(position);
        }}
      />

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="mapContainer"
        options={options}
        onLoad={onLoad}
      >
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
