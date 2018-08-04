export interface Recipe {
    id: number;
    name: string;
    time: number;
    category?: string;
    level?: string;
    cost?: string;
    image?: string;
    quantity?: number;
    dateOfCreation: any;
    ingredients: any[];
    author?: string;
}
