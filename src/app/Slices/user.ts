import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            userInfo: {} as any,
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
        setArea: (state, action) => {
            const { area } = action.payload;
            state.value.userInfo.area = area;
        },
        setPhoneNumber: (state, action) => {
            const { phoneNumber } = action.payload;
            state.value.userInfo.phoneNumber = phoneNumber;
        },
        setEmail: (state, action) => {
            const { email } = action.payload;
            state.value.userInfo["e-mail"] = email;
        },
        setName: (state, action) => {
            const { name } = action.payload;
            state.value.userInfo.name = name;
        },
        setAvatar: (state, action) => {
            const { avatar } = action.payload;
            state.value.userInfo.avatar = avatar;
        },
        deleteFriend: (state, action) => {
            const { friendId } = action.payload;
            state.value.userInfo.friends = state.value.userInfo.friends.map(
                (item: any) => {
                    item.groupArr = item.groupArr.filter(
                        (cur: any) => cur._id !== friendId
                    );
                    return item;
                }
            );
        },
    },
});

export const {
    setUserInfo,
    setFriends,
    addFriends,
    setArea,
    setPhoneNumber,
    setEmail,
    setName,
    setAvatar,
    deleteFriend,
} = userSlice.actions;

export default userSlice.reducer;
