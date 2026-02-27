const API_URL = "http://localhost:8080/admin/soccer";

const postOneSoccerField = async (soccerFieldData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(soccerFieldData),
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error posting soccer field:", error);
        return null;
    }
};

export default { postOneSoccerField };
