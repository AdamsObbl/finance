import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const AmountSlice = createSlice({
  name: 'amounts',
  initialState: {
    value: [],
  },
  reducers: {
    addAmount: (state, action) => {
      action.payload.value > 0 && (
        state.value = [...state.value, { userId: action.payload.userId, value: +action.payload.value, id: uuidv4() }]
      );
    },
    removeAmount: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    removeAllAmountsByUserId: (state, action) => {
      state.value = state.value.filter(item => item.userId !== action.payload);
    },
  },
})

export const { addAmount, removeAmount, removeAllAmountsByUserId } = AmountSlice.actions

export const selectAmount = (state) => state.amounts.value;

export default AmountSlice.reducer
