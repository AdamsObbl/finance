import React, { useEffect, useState } from 'react';
import styles from '../css/Users.module.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/UsersSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/api';


export function Users() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const [saveData, setSaveData] = useState('');
    useEffect(() => {
        if (saveData) {
            const user = { name: saveData, status:0 }
            axios.post(BASE_URL + '/users', user)
                .then(({ data }) => {
                    user.id = data;
                    dispatch(addUser(user));
                    setSaveData('');
                    setName('');
                })
        }
    }, [saveData,dispatch]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSaveData(e.target.value);
        }
    };

    return (<div className={styles.adder}>
        <label className={styles.lbl}>wpisz imię: </label>
        <input
            className={styles.inp}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <input
            className={styles.btn}
            type='button'
            value='Dodaj'
            onClick={(e) => {
                setSaveData(name)
            }}
        />


    </div>)
}