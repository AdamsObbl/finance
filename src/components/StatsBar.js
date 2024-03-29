import React, { useMemo } from "react";
import { Chart } from "react-charts";


export default function StatsBar({ data, Averages, elementType,TouchStart,TouchMove,TouchEnd }) {


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
        }),
        []
    );

    const secondaryAxes = useMemo(() =>
        [
            {
                getValue: (datum) => datum.sum,
                min: 0,
                elementType,
                showDatumElements:true,
            },
        ],
        [elementType]
    );

    return (
        <div onTouchStart={TouchStart} onTouchMove={TouchMove} onTouchEnd={TouchEnd}
            style={{
                width: `100%`,
                height: `calc(100vh - 200px)`,
            }}
        >
            <Chart
   
                options={{
                    data: dataPack,
                    primaryAxis,
                    secondaryAxes,

                    //dark: true,
                }}

            />
        </div>


    );
}
