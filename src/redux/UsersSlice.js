import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    addUser: (state, action) => {
      action.payload.name && (      
        state.value = [...state.value, { 
        id: action.payload.id?action.payload.id:uuidv4(),
        name: action.payload.name,
        status: action.payload.status,
        date_create: action.payload.date_create,
        date_change: action.payload.date_change,
        date_delete: action.payload.date_delete
       }]
      );
    },
    editUser: (state, action) => {
      state.value = state.value.map(user => user.id === action.payload.id ? {...user,name:action.payload.name,status:action.payload.status,date_delete: action.payload.date_delete,date_change: action.payload.date_change} : user)
    },
    removeUser: (state, action) => {
      state.value = state.value.map(user => user.id === action.payload.id ? {...user,date_delete: action.payload.date_delete,status:1} : user)
    },
  },
})

export const { addUser, editUser, removeUser } = UsersSlice.actions

export const selectUsers = (state) => state.users.value;
export const selectUsersNumber = (state) => state.users.value.length;

export default UsersSlice.reducer
