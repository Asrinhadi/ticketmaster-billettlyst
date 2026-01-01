import { sanityClient } from "./client";


export async function fetchUserName(username) {
  const query = `*[_type == "user" && name == $username][0]{
    _id,
    name,
    email,
    gender,
    age,
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

  return sanityClient.fetch(query, { username });
}


export async function fetchUserByEmail(email) {
  const query = `*[_type == "user" && email == $email][0]{
    _id,
    name,
    email,
    gender,
    age,
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

  return sanityClient.fetch(query, { email });
}


export async function fetchAllUsers() {
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


export async function fetchWishList(email) {
  const query = `*[_type == "user" && email == $email][0]{
    "wishlist": wishlist[]->{
      _id,
      title,
      apiId,
      category
    }
  }`;

  return sanityClient.fetch(query, { email });
}


export async function fetchPurchases(email) {
  const query = `*[_type == "user" && email == $email][0]{
    "previousPurchases": previousPurchases[]->{
      _id,
      title,
      apiId,
      category
    }
  }`;

  return sanityClient.fetch(query, { email });
}
