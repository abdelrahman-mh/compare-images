import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from './features/imageSlice'

export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
})

console.log('store', store.getState())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
