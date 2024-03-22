import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    addUser: (state, action) => {
      action.payload&&(
      state.value = typeof action.payload === 'string'?[...state.value, { name: action.payload, id: uuidv4() }]:
      [...state.value, { name: action.payload.name, id: action.payload.id }]
      );
    },
    editUser: (state, action) => {
      state.value = state.value.map(user => user.id === action.payload.id ? {...user,name:action.payload.name} : user)
    },
    removeUser: (state, action) => {
      state.value = state.value.filter(user => user.id !==  action.payload);
    },
  },
})

export const { addUser, editUser, removeUser } = UsersSlice.actions

export const selectUsers = (state) => state.users.value;
export const selectUsersNumber = (state) => state.users.value.length;

export default UsersSlice.reducer
