
export const event = {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'apiId',
            title: 'Ticketmaster API ID',
            type: 'string',
            description: 'ID-en fra ticketmaster API',
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: 'Sport', value: 'sport' },
                    { title: 'Show/Teater', value: 'show' },
                    { title: 'Festival/Musikk', value: 'festival' }
                ]
            }
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category'
        }
    }
}
