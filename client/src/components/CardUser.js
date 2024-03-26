import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { useDispatch } from "react-redux";

import styles from '../css/CardUser.module.css';
import { editUser } from "../redux/UsersSlice";
import { BASE_URL } from "../utils/api";
import axios from "axios";
import { CardEditName } from "./CardEditName";
import { CardAmount } from "./CardAmount";
import { addAmount } from "../redux/AmountSlice";

export function CardUser({ user, rate }) {
    const [result, setResult] = useState(0);

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

    const [restoreData, setRestoreData] = useState(0);
    const [undeleteData, setUndeleteData] = useState({});
    useEffect(() => {
        if (restoreData) {
            axios.get(BASE_URL + '/amounts/last?user_id=' + restoreData)
                .then(({ data }) => {
                    if(!data.length){ return; }
                    const [amount] = data
                    amount.status = 0;
                    setUndeleteData(amount)
                    dispatch(addAmount(amount));
                    setRestoreData(0);
                })
        }
    }, [restoreData, dispatch]);


    useEffect(() => {
        if (Object.keys(undeleteData).length) {
            axios.put(BASE_URL + '/amounts', undeleteData)
                .then(({ data }) => {
                    setUndeleteData({});
                })
        }
    }, [undeleteData]);

    return (
        <div className={styles.elm}>
            <div className={styles.titlElm}>
                <CardEditName user={user} styles={styles} setChangeData={setChangeData} />
                <span className={styles.flex}>
                    <button type="button" className={styles.restoreBtn} value="restore" onClick={(e) => {
                        setRestoreData(user.id);
                    }} ></button>
                    <button type="button" className={styles.removeBtn} value="-" onClick={(e) => {
                        setChangeData({ id: user.id, status: 1 });
                    }} ></button>
                </span>
            </div>
            <div className={styles.bodyElm}>
                <CardAmount setResult={setResult} user={user} rate={rate} />
            </div>
            {result > 0 ?
                <div className={styles.footElm}>
                    {`Dla mnie: ${(result / 100).toFixed(2)}`}
                </div>
                : null}
        </div>
    );
}