import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './UsersSlice';
import AmountReducer from './AmountSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    amounts: AmountReducer,
  },
});
