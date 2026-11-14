
const API_URL = "http://localhost:3000/api";

export const EP = {
    tournaments: `${API_URL}/tournaments`,
    registrations: `${API_URL}/registrations`
};

export const api = async (url, options = {}) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};
