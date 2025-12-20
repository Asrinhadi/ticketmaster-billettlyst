const BASE_URL = "https://app.ticketmaster.com/discovery";
const API_VERSION = "v2";
const API_KEY = "5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv";

/**
const BASE_URL = "/api/discovery";
const API_VERSION = "v2";
const API_KEY = "5uIM4NZwGkUBGkKAVMcS1LTnOrc099Xv"; */

//HENTER 10 eventer fra hver av byene
export const getTenEventsByCity = async (city) => {
  try {
    const url = `${BASE_URL}/${API_VERSION}/events?apikey=${API_KEY}&locale=*&size=10&city=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("feil med å hente events", error);
    return [];
  }
};
