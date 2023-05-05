import axios from "axios";

class requestService {
    service = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API_URL,
        timeout: 5000,
    });

    constructor() {
        let _this = this;
        this.service.interceptors.request.use(
            function (config) {
                const token = _this.getToken();

                // set token to  headers
                if (token !== null) {
                    config.headers.Authorization = token;
                }
                if (config.method === "post") {
                    config.headers["Content-Type"] = "multipart/form-data";
                }
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
        this.service.interceptors.response.use(
            function (response) {
                // console.log(response);
                return response;
            },
            function (error) {
                const { response } = error;
                if (response.status >= 400 && response.status < 500)
                    return Promise.reject(error);
            }
        );
    }

    getToken() {
        return localStorage.getItem("Authorization");
    }
}

const request = new requestService();

export default request;
