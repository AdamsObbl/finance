import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAmount, selectAmount } from "../redux/AmountSlice";
import styles from '../css/CardAmount.module.css';
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { CardInputAmount } from "./CardInputAmount";

export function CardAmount({ setResult, user, rate }) {
    const dispatch = useDispatch();
    const amounts = useSelector(selectAmount);
    const AmountsPerID = useMemo(() => amounts?.filter(amount => amount.userId === user.id), [amounts, user.id]);
    const sumsForAll = useMemo(() => amounts.reduce((acc, { userId, amount }) => ({ ...acc, [userId]: (acc[userId] || 0) + amount }), {}), [amounts]);
    const sumOfRest = useMemo(() => Object.keys(sumsForAll).reduce((acc, key) => (key !== user.id + '' ? acc + sumsForAll[key] : acc), 0), [sumsForAll, user.id]);
    const rateForID = useMemo(() => user.id === 1 ? 1 - rate : rate, [rate, user.id]);



    useEffect(() => {
        setResult(sumsForAll[user.id] * rateForID - (sumOfRest * (1 - rateForID)) || 0);
    }, [setResult, sumsForAll, user.id, rateForID, sumOfRest])



    const [deleteData, setDeleteData] = useState({});
    useEffect(() => {
        if (Object.keys(deleteData).length) {
            dispatch(removeAmount(deleteData));
            axios.put(BASE_URL + '/amounts', deleteData)
                .then(({ data }) => {
                    setDeleteData({});
                })
        }
    }, [deleteData, dispatch]);

 

    return (
        <>
        <CardInputAmount user={user}/>
            <div className={styles.list}>
                {AmountsPerID.length > 0 && AmountsPerID.map((amount, indx) =>
                    <div className={styles['listElm' + (indx % 2 ? 'Even' : 'Odd')]} key={amount.id} title={new Date(amount.date).toLocaleDateString()}>
                        <div className={styles.text}>
                            <span>{(amount.amount / 100).toFixed(2)}x{(+rateForID).toFixed(2)}={(amount.amount * rateForID / 100).toFixed(2)}</span>
                            <span className={styles.smalltext}>{amount.description}</span>
                        </div>
                        <button type="button" className={styles.removeBtn} value="-" onClick={(e) => {
                            setDeleteData({ id: amount.id, status: 1 });
                            //dispatch(removeAmount(amount.id));
                        }} ></button>
                    </div>
                )}
            </div>
        </>
    )
}