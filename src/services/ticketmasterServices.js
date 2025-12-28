const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_KEY = "5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv";

//https://app.ticketmaster.com/discovery/v2/events?apikey=5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv&keyword=Tons%20of%20Rock&countryCode=NO


export async function getCityEvents(city) {
    try {
        const res = await fetch(
            `${BASE_URL}/v2/events?apikey=${API_KEY}&locale=*&size=10&city=${city}`
        );
        const data = await res.json();
        return data._embedded?.events || [];
    } catch (err) {
        console.error("feil med henting av byevents" , err);
        return [];
    }
}




/*export const getFestivalsByIds = async (attractionId) => {
    let apiresponse = null;
    await fetch(`${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&attractionId=${attractionId}&locale=*`)
    .then((response) => response.json())
    .then((data) => apiresponse = data._embedded?.events)

    return apiresponse || [];
}
    */


// henter festivaler basert på attraction ids
export async function getFestivals(ids) {
    try {
        const res = await fetch(`${BASE_URL}/v2/attractions?apikey=${API_KEY}&id=${ids}&locale=*`);
        const data = await res.json();
        return data._embedded?.attractions || [];
    } catch (err) {
        console.error("kunne ikke hente festivaler", err);
        return [];
    }
}


export async function getEvent(id) {
    try {
        const res = await fetch(`${BASE_URL}/v2/events/${id}?apikey=${API_KEY}&locale=*`);
        return await res.json();
    } catch (err) {
        console.error("feil ved henting av event", err);
        return null;
    }
}


export async function getAttraction(id) {
    try {
        const res = await fetch(`${BASE_URL}/v2/attractions/${id}?apikey=${API_KEY}&locale=*`);
        return await res.json();
    } catch (err) {
        console.error("feil ved henting av attraction", err);
        return null;
    }
}


// henter alle events for en attraction som eksempel alle billetter for en festival
export async function getAttractionEvents(attractionId) {
    try {
        const res = await fetch(`${BASE_URL}/v2/events?apikey=${API_KEY}&attractionId=${attractionId}&locale=*`);
        const data = await res.json();
        return data._embedded?.events || [];
    } catch (err) {
        console.error("feil ved henting av attraction events", err);
        return [];
    }
}