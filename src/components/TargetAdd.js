import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addTarget } from "../redux/TargetsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import styles from '../css/TargetAdd.module.css';


export function TargetAdd() {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [addData, setAddData] = useState({});
    useEffect(() => {
        if (Object.keys(addData).length) {
            axios.post(BASE_URL + '/targets', addData)
                .then(({ data }) => {
                    addData.id = data;
                    dispatch(addTarget(addData));
                    setAddData({});
                })
        }
    }, [addData, dispatch]);

    return (<>
        {isAdding ? <></> :

            <label className={styles.addNewTarget}>
                <button onClick={(e) => setIsAdding(true)} className={styles.btnAdd}>
                    <span  className={styles.plus}>
                        <span></span><span></span><span></span><span></span><span></span>
                    </span>
                    <span  className={styles.plus}>
                        <span></span><span></span><span></span><span></span><span></span>
                    </span>
                </button>
                <button></button>
            </label>


            }
    </>);
}