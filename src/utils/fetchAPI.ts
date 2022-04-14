import { NotificationManager } from "react-notifications";
import { API_BASE_URL } from "..";
export const fetchAPI = async (route: string, method: string = "GET", formData?: object) => {
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
