import React from 'react';
import { Users } from './components/Users';
import { Table } from './components/Table';
import { useSelector} from 'react-redux';
import { selectUsers } from './redux/UsersSlice';

function App() {
  const users = useSelector(selectUsers);
  
  return (
    <div className="App">
      <header className="App-header">
        <Users />
        <Table users={users} />
      </header>
    </div>
  );
}

export default App;
