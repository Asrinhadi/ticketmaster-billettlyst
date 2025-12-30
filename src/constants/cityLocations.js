// byer med koordinater for geoPoint søk i ticketmaster
// code = landkode, lat/long = koordinater

export const CITIES = [
    // Norge
    { code: "NO", name: "Oslo", lat: 59.9139, long: 10.7522 },
    { code: "NO", name: "Bergen", lat: 60.3913, long: 5.3221 },
    { code: "NO", name: "Trondheim", lat: 63.4305, long: 10.3951 },
    { code: "NO", name: "Stavanger", lat: 58.9699, long: 5.7331 },
    { code: "NO", name: "Tromsø", lat: 69.6496, long: 18.9560 },

    // Sverige
    { code: "SE", name: "Stockholm", lat: 59.3293, long: 18.0686 },
    { code: "SE", name: "Göteborg", lat: 57.7089, long: 11.9746 },
    { code: "SE", name: "Malmö", lat: 55.6049, long: 13.0038 },

    // Danmark
    { code: "DK", name: "København", lat: 55.6761, long: 12.5683 },
    { code: "DK", name: "Århus", lat: 56.1629, long: 10.2039 },

    // Finland
    { code: "FI", name: "Helsinki", lat: 60.1699, long: 24.9384 },
    { code: "FI", name: "Tampere", lat: 61.4978, long: 23.7610 },

    // Storbritannia
    { code: "GB", name: "London", lat: 51.5074, long: -0.1278 },
    { code: "GB", name: "Manchester", lat: 53.4808, long: -2.2426 },
    { code: "GB", name: "Birmingham", lat: 52.4862, long: -1.8904 },
    { code: "GB", name: "Edinburgh", lat: 55.9533, long: -3.1883 },

    // USA
    { code: "US", name: "New York", lat: 40.7128, long: -74.0060 },
    { code: "US", name: "Los Angeles", lat: 34.0522, long: -118.2437 },
    { code: "US", name: "Chicago", lat: 41.8781, long: -87.6298 },
    { code: "US", name: "Las Vegas", lat: 36.1699, long: -115.1398 },

    // Tyskland
    { code: "DE", name: "Berlin", lat: 52.5200, long: 13.4050 },
    { code: "DE", name: "München", lat: 48.1351, long: 11.5820 },
    { code: "DE", name: "Hamburg", lat: 53.5511, long: 9.9937 },

    // Frankrike
    { code: "FR", name: "Paris", lat: 48.8566, long: 2.3522 },
    { code: "FR", name: "Lyon", lat: 45.7640, long: 4.8357 },
    { code: "FR", name: "Marseille", lat: 43.2965, long: 5.3698 },

    // Spania
    { code: "ES", name: "Madrid", lat: 40.4168, long: -3.7038 },
    { code: "ES", name: "Barcelona", lat: 41.3851, long: 2.1734 },

    // Italia
    { code: "IT", name: "Roma", lat: 41.9028, long: 12.4964 },
    { code: "IT", name: "Milano", lat: 45.4642, long: 9.1900 },

    // Nederland
    { code: "NL", name: "Amsterdam", lat: 52.3676, long: 4.9041 },
    { code: "NL", name: "Rotterdam", lat: 51.9244, long: 4.4777 },

    // Canada
    { code: "CA", name: "Toronto", lat: 43.6532, long: -79.3832 },
    { code: "CA", name: "Vancouver", lat: 49.2827, long: -123.1207 },

    // Japan
    { code: "JP", name: "Tokyo", lat: 35.6762, long: 139.6503 },
    { code: "JP", name: "Osaka", lat: 34.6937, long: 135.5023 },
];

// by-navn for Home-siden (knappene)
export const CITY_NAMES = ["Oslo", "Stockholm", "Berlin", "London", "Edinburgh"];
