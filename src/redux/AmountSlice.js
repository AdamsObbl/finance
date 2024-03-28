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
        state.value = [...state.value, {
          id: action.payload.id?action.payload.id:uuidv4(),
          userId: action.payload.user_id,
          amount: action.payload.amount,
          description: action.payload.description,
          status: action.payload.status,
          date_create: action.payload.date_create,
          date_change: action.payload.date_change,
          date_delete: action.payload.date_delete
         }]
      );
    },
    editAmount: (state, action) => {
      state.value = state.value.map(item => item.id === action.payload.id ? {...item,amount:action.payload.amount,description:action.payload.description,status:action.payload.status,date_delete: action.payload.date_delete,date_change: action.payload.date_change} : item)
    },
    removeAmount: (state, action) => {
      state.value = state.value.map(item => item.id === action.payload.id ? {...item,date_delete: action.payload.date_delete,status:1} : item)
    },
  },
})

export const { addAmount, editAmount, removeAmount } = AmountSlice.actions

export const selectAmount = (state) => state.amounts.value;

export default AmountSlice.reducer
