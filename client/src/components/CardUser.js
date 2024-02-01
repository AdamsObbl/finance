import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addAmount, removeAllAmountsByUserId, removeAmount, selectAmount } from "../redux/AmountSlice";
import styles from './CardUser.module.css';
import { editUser, removeUser, selectUsersNumber } from "../redux/UsersSlice";

export function CardUser({ user }) {
    const [newAmount, setNewAmount] = useState('');
    const dispatch = useDispatch();
    const amounts = useSelector(selectAmount);
    const AmountsPerID = useMemo(() => amounts?.filter(amount => amount.userId === user.id), [amounts, user.id])
    const sumsForAll = useMemo(() => amounts.reduce((acc, { userId, value }) => ({ ...acc, [userId]: (acc[userId] || 0) + value }), {}), [amounts]);
    const sumOfRest = useMemo(() => Object.keys(sumsForAll).reduce((acc, key) => (key !== user.id ? acc + sumsForAll[key] : acc), 0), [sumsForAll, user.id]);
    const usersNumber = useSelector(selectUsersNumber);
    const [isNameEditing, setIsNameEditing] = useState(false)
    const inpNameRef = useRef(null);
    useEffect(() => {
        const handleDocClick = (e) => {
            e.detail === 2 || setIsNameEditing(false);
        }
        if (isNameEditing) {
            inpNameRef.current.focus();
            document.addEventListener('click', handleDocClick);
        }
        return () => document.removeEventListener('click', handleDocClick);
    }, [isNameEditing])

    const result = (sumsForAll[user.id] - (sumOfRest / (usersNumber - 1))) / usersNumber || 0;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsNameEditing(false);
        }
    };
    const handleKeyDownAmount = (e)=> {
        if (e.key === 'Enter') {
            dispatch(addAmount({ userId: user.id, value: e.target.value }));
            setNewAmount('');
        }
    }

    return (
        <div className={styles.elm}>
            <div className={styles.titlElm}>
                <span onClick={(e) => {
                    setIsNameEditing(e.detail === 2);
                }}>
                    {isNameEditing ?
                        <input
                            className={styles.editNameElm}
                            ref={inpNameRef}
                            value={user.name}
                            onChange={e => {
                                dispatch(editUser({ ...user, name: e.target.value }));
                            }}
                            onKeyDown={handleKeyDown}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        /> : user.name}
                </span>
                <input type="button" value="-" onClick={(e) => {
                    dispatch(removeUser(user.id));
                    dispatch(removeAllAmountsByUserId(user.id));
                }} />

            </div>
            <div className={styles.bodyElm}>
                <div className={styles.adder}>
                    <input type="number"
                        className={styles.input}
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        onKeyDown={handleKeyDownAmount}
                        min="1"
                        pattern="^\d*(\.\d{0,2})?$" />
                    <input type="button" value="+" onClick={(e) => {
                        dispatch(addAmount({ userId: user.id, value: newAmount }));
                        setNewAmount('');
                    }} />
                </div>
                <div className={styles.list}>
                    {AmountsPerID.length>0 && AmountsPerID.map((amount,i) =>
                        <div className={styles['listElm'+(i%2?'Even':'Odd')]} key={amount.id}>
                            {amount.value}/{usersNumber}={(amount.value / usersNumber).toFixed(2)}
                            <input type="button" value="-" onClick={(e) => {
                                dispatch(removeAmount(amount.id));
                            }} />
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.footElm}>
                {result > 0 ? `Razem: ${result.toFixed(2)}` : ''}
            </div>
        </div>
    );
}