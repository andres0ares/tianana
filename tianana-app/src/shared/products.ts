import { Product } from './product';


export const PRODUCTS: Product[] = [
    {
        id: '0',
        name: 'Gravata',
        price: 25.00,
        description: 'Gravata Personalizada com a estampa de flores. Tecido de alta qualidade e costura de alto padrão.',
        featured: true,
        category: 'Gravatas',
        shortDescription: 'Gravata Personalizada com a estampa de flores.',
        image: 'https://media2.bulgari.com/f_auto,q_auto/production/dw23024b94/images/images/1179374.png',
        bgImage: '../assets/images/gravata01bg',
        options: [
            {
                id: '0',
                name: 'Flores',
                color: 'Azul',
                fabric: 'Xita',
                image: '../assets/images/gravata01bg'
            },
            {
                id: '1',
                name: 'Marvel',
                color: 'Vermelha',
                fabric: 'Xita',
                image: '../assets/images/gravata01bg'
            }
        ]
    },
    {
        id: '1',
        name: 'Pochete',
        price: 25.00,
        description: 'Pochete Personalizada com a estampa de flores. Tecido de alta qualidade e costura de alto padrão.',
        featured: true,
        category: 'Pochetes',
        shortDescription: 'Pochete Personalizada com a estampa de flores.',
        image: 'https://www.basementskate.com.au/images/P/diamond-aloha-fanny-pack-bum-bag.png',
        bgImage: '../assets/images/gravata01bg',
        options: [
            {
                id: '0',
                name: 'Flores',
                color: 'Azul',
                fabric: 'Xita',
                image: '../assets/images/gravata01bg'
            },
            {
                id: '1',
                name: 'Marvel',
                color: 'Vermelha',
                fabric: 'Xita',
                image: '../assets/images/gravata01bg'
            }
        ]
    },
    {
        id: '2',
        name: 'Bolsa',
        price: 25.00,
        description: 'Bolsa Personalizada com a estampa de flores. Tecido de alta qualidade e costura de alto padrão.',
        featured: true,
        category: 'Bolsas',
        shortDescription: 'Bolsas Perzonalisada com a estampa de flores.',
        image: 'https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,h_400,f_auto/v1/products/1000001631-standing-front.png',
        bgImage: '../assets/images/gravata01bg',
        options: [
            {
                id: '0',
                name: 'Flores',
                color: 'Azul',
                fabric: 'Xita',
                image: '../assets/images/gravata01bg'
            },
            {
                id: '1',
                name: 'Marvel',
                color: 'Vermelha',
                fabric: 'Xita',
                image: '../assets/images/gravata01bg'
            }
        ]
    }
];