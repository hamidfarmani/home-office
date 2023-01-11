import { Container, Loader } from "@mantine/core";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import "../styles/map.css";
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
          </>
        )}
      </GoogleMap>
    </Container>
  );
};
export default MapPage;
