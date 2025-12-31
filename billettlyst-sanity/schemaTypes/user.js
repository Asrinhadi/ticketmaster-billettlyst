
export const user = {
    name: 'user',
    title: 'Bruker',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Navn',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'email',
            title: 'E-post',
            type: 'string'
        },
        {
            name: 'gender',
            title: 'Kjønn',
            type: 'string',
            options: {
                list: [
                    { title: 'Mann', value: 'mann' },
                    { title: 'Kvinne', value: 'kvinne' },
                    { title: 'Annet', value: 'annet' }
                ]
            }
        },
        {
            name: 'age',
            title: 'Alder',
            type: 'number'
        },
        {
            name: 'image',
            title: 'Profilbilde',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt tekst',
                    description: 'Beskrivelse av bildet'
                }
            ]
        },
        {
            name: 'friends',
            title: 'Venner',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }]
        },
        {
            name: 'previousPurchases',
            title: 'Tidligere kjøp',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'event' }] }]
        },
        {
            name: 'wishlist',
            title: 'Ønskeliste',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'event' }] }]
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            media: 'image'
        }
    }
}
