import { apiHost } from "../config";

export default function ({ uri, method = "GET", body }) {
    return fetch(apiHost + uri, {
        method,
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then(async response => {
        if (response.ok) {
            try {
                return response.json();
            } catch (err) {
                return true;
            }
        }
        throw [response.status, await response.json()];
    });
}
