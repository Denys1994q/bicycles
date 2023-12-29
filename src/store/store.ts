import { configureStore } from "@reduxjs/toolkit";
import BicyclesSlice from './slices/bicycles'

const store = configureStore({
    reducer: {
        bicycles: BicyclesSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;