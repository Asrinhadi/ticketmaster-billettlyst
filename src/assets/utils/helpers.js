

export const convertDate = (dateString) => {
    return dateString.split("-").reverse().join(".");
};




export const choseEventPhoto = (event, minWidth, maxWidth, ratio = "16_9") => {
    const validTypes = ["jpg", "jpeg", "png", "webp"];
    
    if (!("images" in event)) {
        return "https://placehold.co/600x400?text=Billettlyst";
    }
    
    const chosenImage = event.images.find((img) => 
        img.ratio === ratio && 
        (img.width <= maxWidth && img.width >= minWidth)
    );
    
    if (!chosenImage || !("url" in chosenImage)) {
        return "https://placehold.co/600x400?text=Billettlyst";
    }
    
    const urlParts = chosenImage.url.split(".");
    
    if (!validTypes.includes(urlParts.pop())) {
        return "https://placehold.co/600x400?text=Billettlyst";
    }
    
    return chosenImage.url;
};

