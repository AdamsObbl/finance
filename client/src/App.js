import React, { useEffect, useState } from 'react';
import { Users } from './components/Users';
import { Table } from './components/Table';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers } from './redux/UsersSlice';
import { addUser } from './redux/UsersSlice';
import axios from 'axios';
import { RateChanges } from './components/RateChanges';

const b_url = 'http://localhost:3001'
// const b_url = './api'

function App() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [rate, setRate] = useState(.6)
  const [userData, setUserData] = useState([])
  useEffect(() => {
    axios.get(b_url + '/users')
      .then(({ data }) => {
        setUserData(data);
      })
  }, []);
  useEffect(() => {
    if (users.length) {
      return;
    }
    userData.forEach(element => {
      dispatch(addUser(element));
    });
  }, [userData]);

  return (
    <div className="App">

      <header className="App-header">
        <Users />
        <RateChanges rate={rate} setRate={setRate}/>
        <Table users={users} rate={rate}  />
      </header>
    </div>
  );
}

export default App;
