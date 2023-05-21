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

const avatar = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/avatar", formData);
};

const password = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/password", formData);
};

const area = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/area", formData);
};

const phoneNumber = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/phoneNumber", formData);
};

const email = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/e-mail", formData);
};
const name = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("user/name", formData);
};

const details = () => {
    return request.service.get("user/details");
};

const getUser = (data: data) => {
    const params = convertToUrlParams(data);
    return request.service.get("/user", { params });
};

export {
    area,
    login,
    register,
    details,
    avatar,
    getUser,
    phoneNumber,
    email,
    password,
    name,
};
