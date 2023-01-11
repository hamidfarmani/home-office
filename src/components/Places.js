import { Loader, Select } from "@mantine/core";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "../styles/map.css";

export default function Places({ setOffice }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  if (!ready) return <Loader />;

  async function handleSelect() {
    clearSuggestions();

    const results = await getGeocode({ address: value });
    const { lat, lng } = await getLatLng(results[0]);
    setOffice({ lat, lng });
  }

  return (
    <Select
      mb="md"
      placeholder="Search office address"
      searchable
      nothingFound="No addresses"
      onSearchChange={setValue}
      data={
        status === "OK"
          ? data.map(({ place_id, description }) => ({
              value: place_id,
              label: description,
            }))
          : []
      }
      onChange={handleSelect}
    />
  );
}
