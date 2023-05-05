import { configureStore } from "@reduxjs/toolkit";
import user from "./Slices/user";
import message from "./Slices/message";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    user,
    message,
});

export default configureStore({
    reducer: { user, message },
});

export type RootState = ReturnType<typeof rootReducer>;
