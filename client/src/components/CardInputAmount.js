import React, { useEffect, useRef, useState } from "react";
import style from '../css/CardAmount.module.css';
import styles from '../css/CardInputAmount.module.css';
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { addAmount } from "../redux/AmountSlice";

export function CardInputAmount({user}) {
    const inpAmountRef = useRef(null);
    const dispatch = useDispatch();
    const [newAmount, setNewAmount] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newAmountMulti, setNewAmountMulti] = useState(0);
    useEffect(() => {
        setNewAmountMulti(newAmount * 100);
    }, [newAmount]);

    const [addData, setAddData] = useState({});
    useEffect(() => {
        if (Object.keys(addData).length) {
            dispatch(addAmount(addData));
            axios.post(BASE_URL + '/amounts', addData)
                .then(({ data }) => {
                    setAddData({});
                    setNewDesc('');
                    setNewAmount('');
                    inpAmountRef.current.focus();
                })
        }
    }, [addData, dispatch]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setAddData({ user_id: user.id, amount: newAmountMulti, description: newDesc });
        }
    }

    return (<form className={styles.adder}>
        <input type="number"
            ref={inpAmountRef}
            className={styles.input}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            min="1"
            pattern="^\d*(\.\d{0,2})?$"
        />
        <input type="text"
            className={styles.inputText}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            enterKeyHint="done"
        />

        <button type="button" className={style.addBtn} value="+" onClick={(e) => {
            newAmountMulti !== 0 && setAddData({ user_id: user.id, amount: newAmountMulti, description: newDesc });
        }} ></button>
    </form>);
}