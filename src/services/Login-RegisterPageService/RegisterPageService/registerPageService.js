const API_URL = "http://localhost:8080/users";

const createUser = async (userData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
};

export default { createUser };
