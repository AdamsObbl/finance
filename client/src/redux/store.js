import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './UsersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
