import request from "@/utils/request";
import { convertToFormData } from "@/utils/utils";

const addFriend = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("/friend/add-friend", formData);
};

const friend = () => {
    return request.service.get("friend");
};

const deletleFriend = (id: string) => {
    return request.service.get(`friend/${id}`);
};

export { addFriend, friend, deletleFriend };
