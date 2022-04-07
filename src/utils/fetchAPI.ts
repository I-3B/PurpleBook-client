import { BASE_URL } from "..";
const token = localStorage.getItem("token");
export const fetchAPI = async (route: string, method: string, formData: object) => {
    let status: number = 500;
    const body = await fetch(`${BASE_URL}/${route}`, {
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
            return res;
        })
        .then((res) => res.json())
        .catch((reason) => {
            alert(reason);
        });
    return { body, status };
};
export const fetchAPIMultiPart = async (route: string, method: string, formData: FormData) => {
    let status: number = 500;
    const body = await fetch(`${BASE_URL}/${route}`, {
        headers: {
            mode: "cors",
            authorization: `Bearer ${token}`,
        },
        method: method,
        body: formData,
    })
        .then((res) => {
            status = res.status;
            return res;
        })
        .then((res) => res.json())
        .catch((reason) => {
            alert(reason);
        });
    return { body, status };
};
