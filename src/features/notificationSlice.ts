import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../utils/types";
import { AppThunk } from "../utils/hooks";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: null,
    visible: false,
  },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },
    hideNotification(state) {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const setNotification = ({
  message,
  type = "info",
  timeout = 3000,
}: Notification): AppThunk => {
  return (dispatch): void => {
    dispatch(showNotification({ message, type }));

    setTimeout(() => {
      dispatch(hideNotification());
    }, timeout);
  };
};
