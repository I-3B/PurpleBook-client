import { NotificationManager } from "react-notifications";

const API_BASE_URL = window.location.origin + "/api";
// const API_BASE_URL = "http://localhost:8080/api";
export const fetchAPI = async (route: string, method: string = "GET") => {
    const token = localStorage.getItem("token");
    let status: number = 500;
    await new Promise((r) => setTimeout(r, 1700));
    const body = await fetch(`${API_BASE_URL}/${route}`, {
        headers: {
            mode: "cors",
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: method,
    })
        .then((res) => {
            status = res.status;
            return res.text();
        })
        .then((body) => {
            try {
                return JSON.parse(body);
            } catch {
                return body;
            }
        })
        .catch((err) => {
            NotificationManager.error(err.message, "Something went wrong :(");
        });
    return { body, status };
};
export const fetchAPIForm = async (route: string, method: string, formData?: object) => {
    const token = localStorage.getItem("token");
    let status: number = 500;
    const body = await fetch(`${API_BASE_URL}/${route}`, {
        headers: {
            mode: "cors",
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(formData),
    })
        .then((res) => {
            status = res.status;
            return res.text();
        })
        .then((body) => {
            try {
                return JSON.parse(body);
            } catch {
                return body;
            }
        })
        .catch((err) => {
            NotificationManager.error(err.message, "Something went wrong :(");
        });
    return { body, status };
};
export const fetchAPIMultiPart = async (route: string, method: string, formData: FormData) => {
    const token = localStorage.getItem("token");
    let status: number = 500;
    const body = await fetch(`${API_BASE_URL}/${route}`, {
        headers: {
            mode: "cors",
            authorization: `Bearer ${token}`,
        },
        method: method,
        body: formData,
    })
        .then((res) => {
            status = res.status;
            return res.text();
        })
        .then((body) => {
            try {
                return JSON.parse(body);
            } catch {
                return body;
            }
        })
        .catch((err) => {
            NotificationManager.error(err.message, "Something went wrong :(");
        });
    return { body, status };
};
