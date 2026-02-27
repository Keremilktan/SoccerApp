const API_URL = "http://localhost:8080/admin/time/";

const getAllCapsuleTimeForOneSoccerField = async (fieldId) => {
    try {
        const url = `${API_URL}${fieldId}`;
        console.log("Veri alınıyor:", url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API isteği başarısız: ${response.status}`);
        }

        const data = await response.json();
        console.log("API yanıt verisi:", data);

        return data;
    } catch (error) {
        console.error("Veri alırken hata oluştu:", error);
        return [];
    }
};

export default { getAllCapsuleTimeForOneSoccerField };
