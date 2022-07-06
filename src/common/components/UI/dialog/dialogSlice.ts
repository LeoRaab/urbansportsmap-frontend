import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';

interface DialogState {
  isVisible: boolean;
  message: string;
}

const initialState: DialogState = {
  isVisible: false,
  message: '',
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    show: (state, { payload: { message } }: PayloadAction<{ message: string }>) => {
      state.isVisible = true;
      state.message = message;
    },
    hide: (state) => {
      state.isVisible = false;
      state.message = '';
    },
  },
});

export const dialogActions = dialogSlice.actions;

export const selectDialog = (state: RootState): DialogState => state.dialog;

export default dialogSlice.reducer;
