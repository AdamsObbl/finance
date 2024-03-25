import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { useDispatch } from "react-redux";

import styles from '../css/CardUser.module.css';
import { editUser } from "../redux/UsersSlice";
import { BASE_URL } from "../utils/api";
import axios from "axios";
import { CardEditName } from "./CardEditName";
import { CardAmount } from "./CardAmount";

export function CardUser({ user, rate }) {
    const [result,setResult]  = useState(0);

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
                    console.log('eee');
                })
        }
    }, [debounceData, dispatch]);

    return (
        <div className={styles.elm}>
            <div className={styles.titlElm}>
                <CardEditName user={user} styles={styles} setChangeData={setChangeData} />
                <button type="button" className={styles.removeBtn} value="-" onClick={(e) => {
                    setChangeData({ id: user.id, status: 1 });
                }} ></button>
            </div>
            <div className={styles.bodyElm}>
                <CardAmount  setResult={setResult} user={user} rate={rate} />
            </div>
            {result > 0 ?
            <div className={styles.footElm}>
                 {`Dla mnie: ${(result/100).toFixed(2)}`} 
            </div>
            : null}
        </div>
    );
}