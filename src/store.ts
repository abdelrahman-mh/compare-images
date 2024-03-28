import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./features/imageSlice";
import notificationReducer from "./features/notificationSlice";

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    notification: notificationReducer,
  },
});

console.log("store", store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
