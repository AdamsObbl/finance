import React from 'react';
import styles from '../css/Users.module.css';

export function RateChanges({ rate, setRate }) {

    const handleChange = (e) =>{
        setRate(e.target.value);
    }

    return(<>
    <label className={styles.lbl}>przelicznik: </label>
    <input className={styles.inp} type='number' step={.01} max={1} min={0} value={rate} onChange={handleChange} />
    </>);
}