import React, { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from "./ResizableBox";

export default function StatsBar({data}) {
    
  const dataPack = [
    {
        "label": "stats",
        "data": data
    }
];

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.sum,
        min: 0,
      },
    ],
    []
  );

  return (
    <>
      <ResizableBox>
        <Chart
          options={{
            data:dataPack,
            primaryAxis,
            secondaryAxes,
          }}
          style={{width:'100%'}}
        />
      </ResizableBox>
    </>
  );
}
