export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    image: string; // URL del medio (imagen o video)
    mediaType?: 'image' | 'video'; // Tipo de medio
    materials: string;
    category?: string;
    createdAt?: Date;
    order: number;
}
