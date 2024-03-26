import React, { useMemo } from "react"
import { selectAmount } from "../redux/AmountSlice";
import { useSelector } from "react-redux";
import { getDatesByMonth } from "../utils/fn";
import StatsBar from "./StatsBar";



export function Stats() {
    const amounts = useSelector(selectAmount);
    const datesByMonth = useMemo(() => getDatesByMonth(amounts), [amounts])


    return (
        <>
            {/* {Object.keys(datesByMonth).map(date=>
            <div key={date}>
                {date} : {(datesByMonth[date].map(i=>amounts[i].amount).reduce((a,b)=>a+b,0)/100).toFixed(2)} zł
            </div>
        )} */}
        
            <StatsBar data={Object.keys(datesByMonth).map(date=>
            ({date, sum:parseFloat((datesByMonth[date].map(i=>amounts[i].amount).reduce((a,b)=>a+b,0)/100).toFixed(0))})
            )} />
        </>
    )
}