import { createSlice } from "@reduxjs/toolkit";
import { deduplicatedArray } from "@/utils/utils";
export const messageSlice = createSlice({
    name: "message",
    initialState: {
        value: {
            verify: [] as any,
            roomId: [] as any,
            chatRooms: [] as any,
            currentRoom: "" as string,
            messages: [] as any,
        },
    },
    reducers: {
        setVerify: (state, action) => {
            const verify = action.payload;
            if (verify)
                state.value.verify = deduplicatedArray(state.value.verify, [
                    verify,
                ]);
        },

        setRoomId: (state, action) => {
            const room = action.payload;
            if (room)
                state.value.roomId = deduplicatedArray(state.value.roomId, [
                    room,
                ]);
        },

        setChatRooms: (state, action) => {
            const room =
                action.payload instanceof Array
                    ? action.payload
                    : [action.payload];
            if (room)
                state.value.chatRooms = deduplicatedArray(
                    state.value.chatRooms,
                    room
                );
        },

        setNewestMessage: (state, action) => {
            const { newestMessage, roomId } = action.payload;
            if (newestMessage) {
                const index = state.value.chatRooms.findIndex(
                    (value: any, keys: any, arr: any) => {
                        return value.roomId === roomId;
                    }
                );
                if (index >= 0)
                    state.value.chatRooms[index].newestMessage =
                        newestMessage.content;
            }
        },

        setCurrentRoom: (state, action) => {
            const { roomId } = action.payload;
            state.value.currentRoom = roomId;
        },

        setMessages: (state, action) => {
            const { reset, messages } = action.payload;
            if (reset) {
                state.value.messages = messages;
            } else state.value.messages.push(messages);
        },
    },
});

export const {
    setVerify,
    setRoomId,
    setChatRooms,
    setCurrentRoom,
    setNewestMessage,
    setMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
