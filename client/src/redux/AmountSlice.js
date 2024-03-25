import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const AmountSlice = createSlice({
  name: 'amounts',
  initialState: {
    value: [],
  },
  reducers: {
    addAmount: (state, action) => {
      action.payload.amount > 0 && (
        state.value = [...state.value, { userId: action.payload.user_id, amount: action.payload.amount, id: action.payload.id?action.payload.id:uuidv4(), description: action.payload.description, date: action.payload.date_create }]
      );
    },
    editUser: (state, action) => {
      state.value = state.value.map(item => item.id === action.payload.id ? {...item,amount:action.payload.amount,description:action.payload.description} : item)
    },
    removeAmount: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload.id);
    },
    removeAllAmountsByUserId: (state, action) => {
      state.value = state.value.filter(item => item.userId !== action.payload);
    },
  },
})

export const { addAmount, editUser, removeAmount, removeAllAmountsByUserId } = AmountSlice.actions

export const selectAmount = (state) => state.amounts.value;

export default AmountSlice.reducer
