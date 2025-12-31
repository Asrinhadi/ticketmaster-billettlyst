import { sanityClient } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
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
