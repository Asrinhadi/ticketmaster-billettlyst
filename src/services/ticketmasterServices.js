const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_KEY = "5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv";




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



// henter forslag for en kategori events og attraksjoner og venues
// bruker suggest for attractions (ikke lokasjonsbasert)
export async function getCategorySuggestions(segmentId, extraQuery = "") {
    if (!segmentId) {
        console.log("segmentid mangler");
        return { events: [], attractions: [], venues: [] };
    }
    
    try {
       
        const res = await fetch(
            `${BASE_URL}/v2/suggest?apikey=${API_KEY}&segmentId=${segmentId}&locale=*${extraQuery}`
        );
        const data = await res.json();
        
        console.log(data); 
        
        return {
            events: data._embedded?.events || [],
            attractions: data._embedded?.attractions || [],
            venues: data._embedded?.venues || [],
        };
    } catch (err) {
        console.error("henter ikke eller feil av kategoryforslag", err);
        // kanskje legge til bedre feilhåndtering senere
        return { events: [], attractions: [], venues: [] };
    }
}

////////////////////////////////////SE PÅ DENN HER I MOREGEN A 
// MÅTTE FLYTTE PÅ DENNE... SE NOATTEBE denne skal hente events med skikkelig filtrering via /v2/events
// denne støtter latlong, radius, unit, countryCode, startDateTime osv 
export async function getCategoryEvents(segmentId, filterParams = {}) {
    if (!segmentId) {
        console.log("segmentid mangler");
        return [];
    }

    try {
        let query = `&segmentId=${segmentId}`;

        if (filterParams.keyword) {
            query += `&keyword=${filterParams.keyword}`;
        }

        if (filterParams.countryCode) {
            query += `&countryCode=${filterParams.countryCode}`;
        }
        if (filterParams.latlong) {
            query += `&latlong=${filterParams.latlong}`;
            query += `&radius=${filterParams.radius || 50}`;
            query += `&unit=${filterParams.unit || 'km'}`;
        }

        if (filterParams.startDateTime) {
            query += `&startDateTime=${filterParams.startDateTime}`;
        }

        const res = await fetch(
            `${BASE_URL}/v2/events?apikey=${API_KEY}&locale=*&size=20${query}`
        );
        const data = await res.json();

        console.log("events fra /v2/events:", data);

        return data._embedded?.events || [];
    } catch (err) {
        console.error("feil ved henting av category events", err);
        return [];
    }
}


// og denne bygger query-string fra filterparams -->henter venues med filtrering
export async function getCategoryVenues(filterParams = {}) {
    try {
        let query = '';

        if (filterParams.keyword) {
            query += `&keyword=${filterParams.keyword}`;
        }
        if (filterParams.countryCode) {
            query += `&countryCode=${filterParams.countryCode}`;
        }
        if (filterParams.latlong) {
            query += `&latlong=${filterParams.latlong}`;
            query += `&radius=${filterParams.radius || 50}`;
            query += `&unit=${filterParams.unit || 'km'}`;
        }

        const res = await fetch(
            `${BASE_URL}/v2/venues?apikey=${API_KEY}&locale=*&size=20${query}`
        );
        const data = await res.json();

        console.log("hva får jeg fra /v2/venues", data);

        return data._embedded?.venues || [];
    } catch (err) {
        console.error("feil ved henting av venues", err);
        return [];
    }
}
//https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#find-suggest-10-v2



//Tutorial med jQuery koden :: https://developer.ticketmaster.com/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html
//API dokumentasjon :: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/


// henter flere events basert på en liste med ids
export async function fetchMultipleEventsById(ids) {
    if (!ids || ids.length === 0) return [];
    
    try {
        const events = await Promise.all(
            ids.map(id => getEvent(id))
        );
        // filtrer bort null-verdier
        return events.filter(event => event !== null);
    } catch (err) {
        console.error("feil ved henting av flere events", err);
        return [];
    }
}

