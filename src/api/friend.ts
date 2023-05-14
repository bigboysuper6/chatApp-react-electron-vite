import request from "@/utils/request";
import { convertToFormData, convertToUrlParams } from "@/utils/utils";

const addFriend = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("/friend/add-friend", formData);
};

const friend = (data: data) => {
    const params = convertToUrlParams(data);
    return request.service.get("friend", { params });
};

const deletleFriend = (id: string) => {
    return request.service.get(`friend/${id}`);
};

export { addFriend, friend, deletleFriend };
