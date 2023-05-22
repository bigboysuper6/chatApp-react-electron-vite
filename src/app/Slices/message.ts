import { createSlice } from "@reduxjs/toolkit";
import { deduplicateObjectArray } from "@/utils/utils";
export const messageSlice = createSlice({
    name: "message",
    initialState: {
        value: {
            verify: [] as any,
            chatRooms: [] as any,
            currentRoom: "" as string,
            messages: [] as any,
            groupInfo: {} as any,
        },
    },
    reducers: {
        setVerify: (state, action) => {
            const verify = action.payload;
            if (verify)
                state.value.verify = deduplicateObjectArray([
                    ...state.value.verify,
                    ...[verify],
                ]);
        },

        resetVerify: (state) => {
            state.value.verify = [];
        },

        setChatRooms: (state, action) => {
            const { rooms } = action.payload;
            console.log(rooms);
            if (rooms)
                state.value.chatRooms = deduplicateObjectArray([
                    ...state.value.chatRooms,
                    ...rooms,
                ]);
        },

        resetChatRooms: (state) => {
            state.value.chatRooms = [];
        },

        setNewestMessage: (state, action) => {
            const { newestMessage, roomId } = action.payload;
            if (newestMessage) {
                const index = state.value.chatRooms.findIndex(
                    (value: any, keys: any, arr: any) => {
                        return value._id === roomId;
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
            const { messages } = action.payload;
            state.value.messages = [...state.value.messages, ...messages];
        },
        resetMessages: (state) => {
            state.value.messages = [];
        },

        setGroupInfo: (state, action) => {
            const { groupInfo } = action.payload;
            state.value.groupInfo = groupInfo;
        },
    },
});

export const {
    setVerify,
    resetVerify,
    resetMessages,
    setChatRooms,
    setCurrentRoom,
    setNewestMessage,
    setMessages,
    resetChatRooms,
    setGroupInfo,
} = messageSlice.actions;

export default messageSlice.reducer;
