import React, { useMemo, useState } from "react"
import { selectAmount } from "../redux/AmountSlice";
import { useSelector } from "react-redux";
import { earliestObject, getDatesByDay, getDatesByMonth, getDatesByWeek, getSumOfAll } from "../utils/fn";
import StatsBar from "./StatsBar";
import styles from '../css/Stats.module.css';
import moment from 'moment';

const names = ['dzienn', 'tygodniow', 'miesięczn'];
const minSwipeDistance = 50

export function Stats() {
    const amounts = useSelector(selectAmount);
    const datesByMonth = useMemo(() => getDatesByMonth(amounts), [amounts]);
    const datesByWeek = useMemo(() => getDatesByWeek(amounts, moment), [amounts]);
    const datesByDay = useMemo(() => getDatesByDay(amounts), [amounts]);
    const earliest = useMemo(() => earliestObject(amounts), [amounts]);
    const sumOfAll = useMemo(() => getSumOfAll(amounts), [amounts]);
    const [presentData, setPresentData] = useState(0);
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const getDates = (datesby) => Object.keys(datesby).map(date =>
        ({ date, sum: getSumOfAll(datesby[date].map(i => amounts[i])) }));

    const getAveranges = (datesby, name) =>
        Object.keys(datesby).map(date => {
            const howMuch = moment().diff(moment(earliest.date_create), name, true);
            return {
                date, sum: sumOfAll / (howMuch < 1 ? 1 : howMuch)
            }
        });


    const minusPresent = () => presentData > 0 && setPresentData(presentData - 1);
    const plusPresent = () => presentData < names.length - 1 && setPresentData(presentData + 1);
    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX);
    }
    const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX); }
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) { return; }
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) {
            isRightSwipe ? minusPresent() : plusPresent();
        }
    }

    return (
        <>
            <div className={styles.flex}>
                <button className={styles.prevBtn} onClick={minusPresent}><span></span></button>
                <h2 className={styles.title}>Wydatki {names[presentData]}e</h2>
                <button className={styles.nextBtn} onClick={plusPresent}><span></span></button>
            </div>

            <StatsBar
                TouchStart={onTouchStart}
                TouchMove={onTouchMove}
                TouchEnd={onTouchEnd}
                data={
                    [getDates(datesByDay), getDates(datesByWeek), getDates(datesByMonth)][presentData]
                }
                elementType={'line'}
                Averages={[
                    {
                        label: `średnia ${names[presentData]}a`,
                        data: [
                            getAveranges(datesByDay, 'days'), getAveranges(datesByWeek, 'weeks'), getAveranges(datesByMonth, 'months')
                        ][presentData]
                    },
                ]}
            />
            <div className={styles.flex}>
                {names.map((_, i) =>
                    <span className={styles.dots} data-active={i === presentData}
                    onClick={()=>setPresentData(i)}></span>
                )}
            </div>
        </>
    )
}