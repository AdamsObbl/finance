import React, { useState } from 'react';
import styles from './Users.module.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/UsersSlice';


export function Users() {
    const [name,setName] = useState('');
    const dispatch = useDispatch();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(addUser(e.target.value));
            setName('');
        }
      };

    return (<div className={styles.adder}>
        <label className={styles.lbl}>wpisz imię: </label>
        <input 
        className={styles.inp}
        value={name}
        onChange={(e)=>setName(e.target.value)}
        onKeyDown={handleKeyDown}
        />
        <input
        className={styles.btn}
            type='button'
            value='Dodaj'
            onClick={(e) => {
                dispatch(addUser(name));
                setName('');
            }}
        />
    

    </div>)
}