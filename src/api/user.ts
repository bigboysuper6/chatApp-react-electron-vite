import request from "@/utils/request";
import { convertToFormData, convertToUrlParams } from "@/utils/utils";
const login = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("/user/login", formData);
};

const register = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/register", formData);
};

const avatar = () => {
    return request.service.get("user/avatar");
};

const details = () => {
    return request.service.get("user/details");
};

const getUser = (data: data) => {
    const params = convertToUrlParams(data);
    return request.service.get("/user", { params });
};

export { login, register, details, avatar, getUser };
