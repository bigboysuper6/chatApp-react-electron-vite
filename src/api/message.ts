import request from "@/utils/request";
import { convertToFormData, convertToUrlParams } from "@/utils/utils";

const sendMessage = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("message", formData);
};

const getMessage = (args: data) => {
    const params = convertToUrlParams(args);
    return request.service.get("message", { params });
};

const getVerify = (args: data) => {
    const params = convertToUrlParams(args);
    return request.service.get("/message/verify", { params });
};
const getRooms = (args: data) => {
    const params = convertToUrlParams(args);
    return request.service.get("/message/rooms", { params });
};

const sendVerifyResult = (data: data) => {
    const formData = convertToFormData(data);
    return request.service.post("/message/verify-result", formData);
};

export { sendMessage, sendVerifyResult, getMessage, getVerify, getRooms };
2;
