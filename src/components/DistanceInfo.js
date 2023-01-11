import { Text } from "@mantine/core";

const commutesPerYear = 260 * 2;
const litresPerKM = 8 / 100;
const gasLitreCost = 2;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

export default function DistanceInfo({ leg }) {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );

  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  return (
    <>
      <Text>
        This home is{" "}
        <Text fw={700} span>
          {leg.distance.text}
        </Text>{" "}
        away from your office. That would take{" "}
        <Text fw={700} span>
          {leg.duration.text}{" "}
        </Text>
        each direction.{" "}
      </Text>
      <Text>
        That's{" "}
        <Text fw={700} span>
          {days} days
        </Text>{" "}
        in your car each year at a cost of{" "}
        <Text fw={700} span>
          ${cost.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </Text>
        .
      </Text>
    </>
  );
}
