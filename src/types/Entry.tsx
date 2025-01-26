export interface Entry {
    _id: string;
    title: string;
    date: string;
    image: {
        url: string;
        alt: string;
        caption: string;
    }
    body: string;
    links: {
        href: string;
        linkText: string;
    }[]
}
