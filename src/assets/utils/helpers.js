

const PLACEHOLDER = "https://placehold.co/600x400?text=Billettlyst";


export function formatDate(date) {
    if (!date) return "";
    return date.split("-").reverse().join(".");
}


export function getImage(item, minW = 300, maxW = 800) {
    if (!item?.images) return PLACEHOLDER;
    
    const img = item.images.find(i => 
        i.ratio === "16_9" && i.width >= minW && i.width <= maxW
    );
    
    return img?.url || PLACEHOLDER;
}

// datoformat fra api: dates.start.localDate (YYYY-MM-DD)
// konverterer til norsk format (DD.MM.YYYY)
