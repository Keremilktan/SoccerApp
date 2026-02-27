const API_URL = "http://localhost:8080/admin/soccer/main";

const getAllMainSoccerFields = async () => {
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error('API request failed');
        }
        return await response.json();
    }catch(error){
        console.error('Error fetching soccerFiled:', error);
        return [];
    }
};

export default {getAllMainSoccerFields};
