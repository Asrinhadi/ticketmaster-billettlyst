
import { createClient } from '@sanity/client'
//import imageUrlBuilder from '@sanity/image-url'


export const sanityClient = createClient({
    projectId: 'bbdw0p64',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true
})


//const builder = imageUrlBuilder(sanityClient)
/*
export function urlFor(source) {
    return builder.image(source)
}
*/

export async function getAllEvents() {
    const query = `*[_type == "event"]{
        _id,
        title,
        apiId,
        category
    }`
    const data = await sanityClient.fetch(query)
    return data
}


export async function getAllUsers() {
    const query = `*[_type == "user"]{
        _id,
        name,
        email,
        gender,
        age,
        image,
        "wishlist": wishlist[]->{_id, title, apiId, category},
        "previousPurchases": previousPurchases[]->{_id, title, apiId, category}
    }`
    const data = await sanityClient.fetch(query)
    return data
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
    }`

    const data = await sanityClient.fetch(query, { email })
    return data
}
