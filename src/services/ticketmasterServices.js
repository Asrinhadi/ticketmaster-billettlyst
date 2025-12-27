const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_VERSION = "v2";
const API_KEY = "5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv";


//https://app.ticketmaster.com/discovery/v2/events?apikey=5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv&keyword=Tons%20of%20Rock&countryCode=NO

const apiCall = (...args) => fetch(...args);

//HENTER 10 eventer fra hver av byene
export const getTenEventsByCity = async (cityName) => {
    let response = null;
    
    try {
        const data = await apiCall(
            `${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&locale=*&size=10&city=${cityName}`
        );
        const result = await data.json();
        response = result._embedded?.events;
    } catch (error) {
        console.error("noe feil med innhenting av byeventsene", error);
    }
    
    return response || [];
};




/*export const getFestivalsByIds = async (attractionId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&attractionId=${attractionId}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded?.events)

    return apiresponse || [];
}
    */


//HENTER festivaler basert på attraction ids

export const getFestivalsByIds = async (attractionIds) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/attractions?apikey=${API_KEY}&id=${attractionIds}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded?.attractions)

    return apiresponse || [];
}