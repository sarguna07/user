import makeRequest from ".";


export function fetchUser() {
    return makeRequest({
        uri: `/api/users?page=2`
    });
}

export function createUser(requestBody) {
    return makeRequest({
        uri: `/api/v1/users`,
        method: "POST",
        body: JSON.stringify(requestBody)
    });
}

export function updateUser(requestBody, id) {
    return makeRequest({
        uri: `/api/v1/users/${id}`,
        method: "PUT",
        body: JSON.stringify(requestBody)
    });
}

export function showUser(id) {
    return makeRequest({
        uri: `/api/users/${id}`
    });
}

export function deleteUser(id) {
    return makeRequest({
        uri: `/api/users/${id}`,
        method: 'DELETE'
    });
}