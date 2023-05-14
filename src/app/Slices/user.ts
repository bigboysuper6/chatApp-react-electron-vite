import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            userInfo: {},
            friends: [] as any,
        },
    },
    reducers: {
        setUserInfo: (state, action) => {
            const { userInfo } = action.payload;
            state.value.userInfo = userInfo;
        },
        setFriends: (state, action) => {
            const friends = action.payload;
            state.value.friends = friends;
        },
        addFriends: (state, action) => {
            const friend = action.payload;
            state.value.friends.push(friend);
        },
    },
});

export const { setUserInfo, setFriends, addFriends } = userSlice.actions;

export default userSlice.reducer;
