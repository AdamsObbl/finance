import React, { useEffect, useState } from "react"
import styles from '../css/Table.module.css';
import { CardUser } from "./CardUser";
import { selectUsers } from '../redux/UsersSlice';
import { BASE_URL } from "../utils/api";
import { addUser } from '../redux/UsersSlice';
import { addAmount, selectAmount } from "../redux/AmountSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export function Table({ rate }) {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const amounts = useSelector(selectAmount);
    const [userData, setUserData] = useState([]);
    const [amountData, setAmountData] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + '/users')
            .then(({ data }) => {
                setUserData(data);
            });

        axios.get(BASE_URL + '/amounts')
            .then(({ data }) => {
                setAmountData(data);
            })
    }, []);
    useEffect(() => {
        if (users.length) {
            return;
        }
        userData.forEach(element => {
            dispatch(addUser(element));
        });
    }, [userData, dispatch, users.length]);
    useEffect(() => {
        if(amounts.length){
          return
        }
        amountData.forEach(element => {
          dispatch(addAmount(element));
        });
      }, [amountData,dispatch,amounts.length]);

    return <div className={styles.grid}>
        {users?.filter(user=>!user?.status)?.map((user) =>
            <CardUser user={user} key={user.id} rate={rate} />
        )}
    </div>
}