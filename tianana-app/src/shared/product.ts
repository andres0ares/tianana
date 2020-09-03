
export class Option {
    id: String;
    name: String;
    color: String;
    fabric: String;
    image: String;
}

export class Product {
    id: string;
    name: string;
    price: Number;
    description: String;
    featured: Boolean;
    category: String;
    shortDescription: String;
    image: String;
    images: String[];
    bgImage: String;
    options: Option[];
}

