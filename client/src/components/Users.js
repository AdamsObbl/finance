import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, selectUsers } from '../redux/UsersSlice';
import { Table } from './Table';

export function Users() {
    const [name,setName] = useState('')
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    return (<>
        <label>wpisz imię: </label>
        <input value={name} onChange={(e)=>setName(e.target.value)}/>
        <input
            type='button'
            value='Dodaj'
            onClick={(e) => {
                dispatch(addUser(name));
                setName('');
            }}
        />
        <Table users={users} />      

    </>)
}