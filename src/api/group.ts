import request from "@/utils/request";
import { convertToFormData, convertToUrlParams } from "@/utils/utils";

const addGroup = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("/group/add-group", formData);
};
const groupMembers = (data: data) => {
    const params = convertToUrlParams(data);
    return request.service.get("/group/group-info", { params });
};
const deleteRoom = (id: string) => {
    return request.service.delete(`group/${id}`);
};
export { addGroup, groupMembers, deleteRoom };
