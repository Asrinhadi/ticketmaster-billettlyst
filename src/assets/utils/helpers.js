

const PLACEHOLDER = "https://placehold.co/600x400?text=Billettlyst";


export function formatDate(date) {
    if (!date) return "";
    return date.split("-").join(".");
}


export function getImage(item, minW = 300, maxW = 800) {
    if (!item?.images) return PLACEHOLDER;
    
    const img = item.images.find(i => 
        i.ratio === "16_9" && i.width >= minW && i.width <= maxW
    );
    
    return img?.url || PLACEHOLDER;
}

export function getPlace(apiEvent) {
  const venue = apiEvent?._embedded?.venues?.[0];
  const city = venue?.city?.name;
  const country = venue?.country?.name;
  return city && country ? `${city}, ${country}` : venue?.name || "Ukjent sted";
}

export function getType(apiEvent) {
  return (
    apiEvent?.classifications?.[0]?.genre?.name ||
    apiEvent?.classifications?.[0]?.segment?.name ||
    "Ukjent type"
  );
}

export function getDate(apiEvent) {
  return apiEvent?.dates?.start?.localDate || "Ukjent dato";
}


// datoformat fra api: dates.start.localDate (YYYY-MM-DD)
// konverterer til norsk format (DD.MM.YYYY)
