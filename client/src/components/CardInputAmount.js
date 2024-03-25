import React, { useEffect, useRef, useState } from "react";
import style from '../css/CardAmount.module.css';
import styles from '../css/CardInputAmount.module.css';
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { addAmount, editUser } from "../redux/AmountSlice";

export function CardInputAmount({user,amount,setIsEdit}) {
    const inpAmountRef = useRef(null);
    const dispatch = useDispatch();
    const [newAmount, setNewAmount] = useState((amount?.amount/100).toFixed(2)||'');
    const [newDesc, setNewDesc] = useState(amount?.description||'');
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

    const [changeData, setChangeData] = useState({});
    useEffect(() => {
        if (Object.keys(changeData).length) {
            dispatch(editUser(changeData));
            axios.put(BASE_URL + '/amounts', changeData)
                .then(({ data }) => {
                    setChangeData({});
                    setIsEdit(-1);
                })
        }
    }, [changeData, dispatch, setIsEdit]);

    const setActionData=()=>{
        if(!newAmountMulti){
            return;
        } 
        if(amount){
            setChangeData({ id: amount.id, user_id: user.id, amount: newAmountMulti, description: newDesc })
        }
        else{
            setAddData({ user_id: user.id, amount: newAmountMulti, description: newDesc });
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setActionData()
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

        <button type="button" className={amount?style.okBtn:style.addBtn} value="+" onClick={()=>setActionData()} ></button>
    </form>);
}