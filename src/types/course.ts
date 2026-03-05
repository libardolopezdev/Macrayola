export interface Course {
    id?: string;
    title: string;
    description: string;
    date: string;
    duration: string;
    price: number;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    type: 'presencial' | 'virtual';
    maxStudents?: number;
    order: number;
    createdAt?: Date;
}
