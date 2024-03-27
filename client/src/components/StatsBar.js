import React, { useMemo } from "react";
import { Chart } from "react-charts";


export default function StatsBar({ data, Averages, max, elementType }) {


    const dataPack = [
        {
            "label": 'wydatki',
            "data": data,
        },
        ...(Averages ? Averages : [])
    ].filter(Boolean);

    const primaryAxis = useMemo(
        () => ({
            getValue: (datum) => datum.date,
            min: new Date('2024-03-22 12:50:00')
        }),
        []
    );

    const secondaryAxes = useMemo(() =>
        [
            {
                getValue: (datum) => datum.sum,
                min: 0,
                max,
                elementType,
                showDatumElements:true,
            },
        ],
        [elementType, max]
    );


    const axes = React.useMemo(
        () => [
            { primary: true, type: "linear", position: 0 },
            { position: 0, type: "linear", stacked: true }
        ],
        []
    );

    return (
        <div
            style={{
                width: `100%`,
                height: `320px`,
            }}
        >
            <Chart
                axes={axes}
                options={{
                    data: dataPack,
                    primaryAxis,
                    secondaryAxes,
                    axes,
                    //dark: true,
                }}

            />
        </div>


    );
}
