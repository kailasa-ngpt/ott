export interface ICategory {
    id: string;
    name: string;
    description: string;
    parentId?: string; // Optional parent category
    createdDate: string;
    updatedDate: string;
} 