import React, { useState } from 'react';
import { Users } from './components/Users';
import { Table } from './components/Table';
import { RateChanges } from './components/RateChanges';
import { useSelector } from 'react-redux';
import { selectUsers } from './redux/UsersSlice';
import styles from './css/main.module.css';
import { Stats } from './components/Stats';
import { Targets } from './components/Targets';

function App() {
  const [rate, setRate] = useState(.6);
  const users = useSelector(selectUsers);
  const [active, setActive] = useState(2);

  return (
    <div className="App">
      <nav className={styles.nav}>
        <ul className={styles.tabs}>
          <li data-active={!active} onClick={(e) => setActive(0)}><span>Wydatki</span></li>
          <li data-active={active === 1} onClick={(e) => setActive(1)}><span>Podsumowanie</span></li>
          <li data-active={active === 2} onClick={(e) => setActive(2)}><span>Cele</span></li>
        </ul>
      </nav>
      {[
        <section>
          {users?.filter(user => !user.status)?.length === 2 ? null : <Users />}
          <RateChanges rate={rate} setRate={setRate} />
          <Table rate={rate} />
        </section>,
        <section>
          <Stats />
        </section>,
        <section>
          <Targets />
        </section>
      ][active]}
    </div>
  );
}

export default App;
