import React, { useMemo, useState } from "react"
import { selectAmount } from "../redux/AmountSlice";
import { useSelector } from "react-redux";
import { earliestObject, getDatesByDay, getDatesByMonth, getDatesByWeek, getSumOfAll } from "../utils/fn";
import StatsBar from "./StatsBar";
import styles from '../css/Stats.module.css';
import moment from 'moment';

const names = ['dzienn', 'tygodniow', 'miesięczn']

export function Stats() {
    const amounts = useSelector(selectAmount);
    const datesByMonth = useMemo(() => getDatesByMonth(amounts), [amounts]);
    const datesByWeek = useMemo(() => getDatesByWeek(amounts, moment), [amounts]);
    const datesByDay = useMemo(() => getDatesByDay(amounts), [amounts]);
    const earliest = useMemo(() => earliestObject(amounts), [amounts]);
    const sumOfAll = useMemo(() => getSumOfAll(amounts), [amounts]);
    const [presentData, setPresentData] = useState(0);

    const getDates = (datesby) => Object.keys(datesby).map(date =>
        ({ date, sum: getSumOfAll(datesby[date].map(i => amounts[i])) }));

    const getAveranges = (datesby, name) =>
        Object.keys(datesby).map(date =>{
            const howMuch = moment().diff(moment(earliest.date_create), name, true);
            return {
                date, sum: sumOfAll / (howMuch < 1 ? 1 :howMuch)
            }
        });


    return (
        <>
            {/* <h2>Wydatki per miesiąc</h2>
            <StatsBar data={Object.keys(datesByMonth).map(date =>
                ({ date, sum: parseFloat((datesByMonth[date].map(i => amounts[i].amount).reduce((a, b) => a + b, 0) / 100).toFixed(0)) })
            )} elementType={'bar'} /> */}

            <div className={styles.flex}>
                <button className={styles.prevBtn} onClick={() => presentData > 0 && setPresentData(presentData - 1)}><span></span></button>
                <h2 className={styles.title}>Wydatki {names[presentData]}e</h2>
                <button className={styles.nextBtn} onClick={() => presentData < 2 && setPresentData(presentData + 1)}><span></span></button>
            </div>

            <StatsBar
                data={
                    [getDates(datesByDay), getDates(datesByWeek), getDates(datesByMonth)][presentData]
                }
                elementType={'line'}
                Averages={[
                    {
                        label: `średnia ${names[presentData]}a`,
                        data: [
                            getAveranges(datesByDay,'days'),getAveranges(datesByWeek,'weeks'),getAveranges(datesByMonth,'months')
                        ][presentData]
                    },
                ]}
            />
        </>
    )
}