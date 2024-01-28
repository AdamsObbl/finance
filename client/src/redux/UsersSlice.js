import { createSlice } from '@reduxjs/toolkit'

export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.value = [...state.value, { name: action.payload, id: state.value.length }];
    },
  },
})

export const { addUser } = UsersSlice.actions

export const selectUsers = (state) => state.users.value

export default UsersSlice.reducer
