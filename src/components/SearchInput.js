import { NumberInput, SimpleGrid, Slider, TextInput } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useState } from "react";
import { useSearchInputsStyles } from "../styles/searchInputsStyles";

const SearchInput = () => {
  const { classes } = useSearchInputsStyles();
  const [value, setValue] = useState(2200);
  const [dateValue, setDateValue] = useState([
    new Date(2023, 0, 1),
    new Date(2023, 0, 5),
  ]);

  return (
    <SimpleGrid cols={3} spacing="xs">
      <TextInput label="Where to?" placeholder="Iceland" classNames={classes} />

      <DateRangePicker
        label="From date - To date"
        placeholder="Pick dates range"
        value={dateValue}
        onChange={setDateValue}
        classNames={classes}
        clearable={false}
      />

      <div className={classes.wrapper}>
        <NumberInput
          value={value}
          onChange={setValue}
          label="Price $"
          placeholder="2200 is an average value"
          step={50}
          min={0}
          max={8000}
          hideControls
          classNames={{ input: classes.input, label: classes.label }}
        />
        <Slider
          max={8000}
          step={50}
          min={0}
          label={null}
          value={value}
          onChange={setValue}
          size={2}
          radius={0}
          className={classes.slider}
          classNames={{ thumb: classes.thumb, track: classes.track }}
        />
      </div>
    </SimpleGrid>
  );
};
export default SearchInput;
