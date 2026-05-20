import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type notificationType = 'success' | 'error';

interface Notification {
  message: string;
  type: notificationType;
}

const initialState: Notification = {
  message: '',
  type: 'error',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    uploadNotification(notificationState, { payload }: PayloadAction<Notification>) {
      notificationState.message = payload.message;
      notificationState.type = payload.type;
    },
  },
});

export const getNotificationState = createSelector(
  (state: RootState) => state.notification,
  (notificationState) => notificationState
);

export const { uploadNotification } = notificationSlice.actions;
export default notificationSlice.reducer;