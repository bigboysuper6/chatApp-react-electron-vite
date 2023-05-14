import request from "@/utils/request";
import { convertToFormData, convertToUrlParams } from "@/utils/utils";

const addGroup = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("/group/add-group", formData);
};
export { addGroup };
