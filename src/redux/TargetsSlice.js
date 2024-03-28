import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const TargetsSlice = createSlice({
  name: 'targets',
  initialState: {
    value: [],
  },
  reducers: {
    addTarget: (state, action) => {
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
    editTargetr: (state, action) => {
      state.value = state.value.map(target => target.id === action.payload.id ? {...target,name:action.payload.name,status:action.payload.status,date_delete: action.payload.date_delete,date_change: action.payload.date_change} : target)
    },
    removeTarget: (state, action) => {
      state.value = state.value.map(target => target.id === action.payload.id ? {...target,date_delete: action.payload.date_delete,status:1} : target)
    },
  },
})

export const { addTarget, editTarget, removeTargetr } = TargetsSlice.actions

export const selectTargets = (state) => state.targets.value;
export const selectTargetsNumber = (state) => state.targets.value.length;

export default TargetsSlice.reducer
