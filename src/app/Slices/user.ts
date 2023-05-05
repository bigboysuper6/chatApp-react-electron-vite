import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            userInfo: {},
        },
    },
    reducers: {
        setUserInfo: (state, action) => {
            const { userInfo } = action.payload;
            state.value.userInfo = userInfo;
        },
    },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
