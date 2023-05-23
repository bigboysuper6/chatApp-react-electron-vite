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
            if (rooms) state.value.chatRooms = rooms;
        },

        addChatRooms: (state, action) => {
            const { room } = action.payload;
            console.log(room);
            if (room) {
                const sameRoomIndex = state.value.chatRooms.findIndex(
                    (item: any) => {
                        console.log(item._id, room._id);
                        return item._id == room._id;
                    }
                );
                console.log(sameRoomIndex);
                if (sameRoomIndex >= 0) {
                    state.value.chatRooms.splice(sameRoomIndex, 1);
                }
                state.value.chatRooms.push(room);
            }
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
    addChatRooms,
} = messageSlice.actions;

export default messageSlice.reducer;
