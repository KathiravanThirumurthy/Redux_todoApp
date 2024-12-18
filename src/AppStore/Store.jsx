import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice';
const appStore=configureStore({
    reducer:{
        todos: todoReducer, // Attach the todos slice
    }
})
export default appStore;