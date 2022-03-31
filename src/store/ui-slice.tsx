import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  notification: {
    message: string;
    type: AlertColor;
    open: boolean;
  } | null;
}

const initialState: IInitialState = { notification: null };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        open: action.payload.open,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
