import React, { useMemo } from "react"
import { selectAmount } from "../redux/AmountSlice";
import { useSelector } from "react-redux";
import { earliestObject, getDatesByMonth, getSumOfAll, howMuchDays, sortedDataByDateCreate } from "../utils/fn";
import StatsBar from "./StatsBar";



export function Stats() {
    const amounts = useSelector(selectAmount);
    const datesByMonth = useMemo(() => getDatesByMonth(amounts), [amounts]);
    const earliest = useMemo(() => earliestObject(amounts), [amounts]);
    const sumOfAll = useMemo(() => getSumOfAll(amounts), [amounts]);
    const dayofLife = useMemo(() => howMuchDays(earliest.date_create), [earliest])
    const sortedAmounts = useMemo(() => sortedDataByDateCreate(amounts), [amounts])

    return (
        <>
            <h2>wydatki per miesiąc</h2>
            <StatsBar data={Object.keys(datesByMonth).map(date =>
                ({ date, sum: parseFloat((datesByMonth[date].map(i => amounts[i].amount).reduce((a, b) => a + b, 0) / 100).toFixed(0)) })
            )} elementType={'bar'} />
            <h2>wydatki dzienne</h2>
            <StatsBar
                data={sortedAmounts.map(amount =>
                    ({ date: new Date(amount.date_create), sum: amount.amount / 100 })
                )}
                elementType={'line'}
                max={sumOfAll}
                Averages={[
                    {
                        label: "średnia dzienna",
                        data: sortedAmounts.map(amount =>
                            ({ date: new Date(amount.date_create), sum: sumOfAll / dayofLife })
                        ),
                    },
                    {
                        label: "średnia tygodniowa",
                        data: sortedAmounts.map(amount =>
                            ({ date: new Date(amount.date_create), sum: sumOfAll / (dayofLife / 7 > 1 ? dayofLife / 7 : 1) })
                        ),
                    },
                    {
                        label: "średnia miesięczna",
                        data: sortedAmounts.map(amount =>
                            ({ date: new Date(amount.date_create), sum: sumOfAll / (dayofLife / 30 > 1 ? dayofLife / 30 : 1) })
                        ),
                    }
                ]}
            />
        </>
    )
}