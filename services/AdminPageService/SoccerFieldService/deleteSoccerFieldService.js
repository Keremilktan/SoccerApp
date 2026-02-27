const API_URL = "http://localhost:8080/admin/soccer";

const deleteOneSoccerField = async (soccerFieldId) => {
    try {
        const response = await fetch(`${API_URL}/${soccerFieldId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting soccer field:", error);
        return null;
    }
};

export default deleteOneSoccerField;
