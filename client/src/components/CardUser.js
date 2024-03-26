import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { useDispatch, useSelector } from "react-redux";
import styles from '../css/CardUser.module.css';
import { editUser } from "../redux/UsersSlice";
import { BASE_URL } from "../utils/api";
import axios from "axios";
import { CardEditName } from "./CardEditName";
import { CardAmount } from "./CardAmount";
import { editAmount, selectAmount } from "../redux/AmountSlice";

export function CardUser({ user, rate }) {
    const [result, setResult] = useState(0);
    const amounts = useSelector(selectAmount);
    const dispatch = useDispatch();

    //const usersNumber = useSelector(selectUsersNumber);
    const [changeData, setChangeData] = useState('');
    const [debounceData] = useDebounce(changeData, 1000);
    useEffect(() => {
        if (Object.keys(debounceData).length) {
            dispatch(editUser(debounceData));
            axios.put(BASE_URL + '/users', debounceData)
                .then(({ data }) => {
                    setChangeData({});
                })
        }
    }, [debounceData, dispatch]);

    const [restoreData, setRestoreData] = useState(false);
    const [undeleteData, setUndeleteData] = useState({});
    const [lastAmount, setlastAmount] = useState(false);

    useEffect(() => {
        if (restoreData && lastAmount) {
            const unDeleteAmount = { ...lastAmount, status: 0, date_delete: '0000-00-00 00:00:00', date_change: new Date().toISOString() }
            setUndeleteData(unDeleteAmount);
            setRestoreData(false);
        }
    }, [restoreData, lastAmount]);


    useEffect(() => {
        if (lastAmount === false) {
            const hides = amounts.filter(am => am.userId === user.id && am.status);
            const latest = hides.length ? hides.reduce((prev, current) =>
                (new Date(current.date_delete) > new Date(prev.date_delete)) ? current : prev
            ) : undefined;

            setlastAmount(latest);
        }
    }, [lastAmount, user.id, amounts]);

    useEffect(() => {
        if (Object.keys(undeleteData).length) {
            axios.put(BASE_URL + '/amounts', undeleteData)
                .then(({ data }) => {
                    setUndeleteData({});
                    setlastAmount(false);
                    dispatch(editAmount(undeleteData));
                })
        }
    }, [undeleteData,dispatch]);

    return (
        <div className={styles.elm}>
            <div className={styles.titlElm}>
                <CardEditName user={user} styles={styles} setChangeData={setChangeData} />
                <span className={styles.flex}>
                    {lastAmount !== undefined ? <button type="button" className={styles.restoreBtn} value="restore" onClick={(e) => {
                        setRestoreData(true);
                    }} ></button> : null}
                    <button type="button" className={styles.removeBtn} value="-" onClick={(e) => {
                        setChangeData({ id: user.id, status: 1 });
                    }} ></button>
                </span>
            </div>
            <div className={styles.bodyElm}>
                <CardAmount setResult={setResult} user={user} rate={rate} setlastAmount={setlastAmount} />
            </div>
            {result > 0 ?
                <div className={styles.footElm}>
                    {`Dla mnie: ${(result / 100).toFixed(2)}`}
                </div>
                : null}
        </div>
    );
}