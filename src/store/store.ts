import { configureStore } from "@reduxjs/toolkit";
import BicyclesSlice from './slices/bicycles'

const store = configureStore({
    reducer: {
        BicyclesSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})

export default store;