import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './UsersSlice';
import AmountReducer from './AmountSlice';
import TargetsSlice from './TargetsSlice';

export default configureStore({
  reducer: {
    users: UsersReducer,
    amounts: AmountReducer,
    targets: TargetsSlice
  },
});
