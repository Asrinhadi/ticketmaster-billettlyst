import { sanityClient } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}


// denne skal hente eventen uti fra apiiden
export async function getSingleEvent(apiId) {
  const query = `*[_type == "event" && apiId == $apiId][0]{
    _id,
    title,
    category,
    apiId,
    image
  }`;
  
  return await client.fetch(query, { apiId });
}




export async function getAllUsers() {
  const query = `*[_type == "user"]{
    _id,
    name,
    email,
    image,
    "wishlist": wishlist[]->{
      _id,
      title,
      apiId,
      category
    },
    "previousPurchases": previousPurchases[]->{
      _id,
      title,
      apiId,
      category
    }
  }`;

  return sanityClient.fetch(query);
}



// hent event med alle brukere som har den i wishlist eller kjøpt
export async function getSanityEventWithUsers(apiId) {
  const query = `*[_type == "event" && apiId == $apiId][0]{
    _id,
    title,
    apiId,
    category,

    "wishlistUsers": *[_type == "user" && ^._id in wishlist[]._ref]{
      _id, name, email, image
    },

    "purchaseUsers": *[_type == "user" && ^._id in previousPurchases[]._ref]{
      _id, name, email, image
    }
  }`;

  return sanityClient.fetch(query, { apiId });
}


export async function getAllEvents() {
  const query = `*[_type == "event"]{
    _id,
    title,
    apiId,
    category
  }`;

  return sanityClient.fetch(query);
}

export async function getUserByEmail(email) {
  const query = `*[_type == "user" && email == $email][0]{
    _id,
    name,
    email,
    gender,
    age,
    image,
    "wishlist": wishlist[]->{_id, title, apiId, category},
    "previousPurchases": previousPurchases[]->{_id, title, apiId, category}
  }`;

  return sanityClient.fetch(query, { email });
}

