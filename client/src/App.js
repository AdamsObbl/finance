import React, { useState } from 'react';
import { Users } from './components/Users';
import { Table } from './components/Table';
import { RateChanges } from './components/RateChanges';
import { useSelector } from 'react-redux';
import { selectUsers } from './redux/UsersSlice';
import styles from './css/main.module.css';

function App() {
  const [rate, setRate] = useState(.6);
  const users = useSelector(selectUsers);

  return (
    <div className="App" styles={styles}>
      <header className="App-header">
      {users.length===2?null:<Users />}
        <RateChanges rate={rate} setRate={setRate} />
        <Table rate={rate}  />
      </header>
    </div>
  );
}

export default App;
