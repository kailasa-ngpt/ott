import { ICategory } from '../models/ICategory';

// This is a temporary mock database for development
let mockCategories: ICategory[] = [
    {
        id: "cat1",
        name: "Talks",
        description: "Spiritual talks and lectures",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "cat2",
        name: "Meditation",
        description: "Guided meditations and practices",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "cat3",
        name: "Ceremonies",
        description: "Sacred ceremonies and rituals",
        parentId: "cat1", // This is a subcategory of Talks
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    }
];

export class CategoryService {
    // Get all categories
    async getAllCategories(): Promise<ICategory[]> {
        return mockCategories;
    }

    // Get a category by ID
    async getCategory(categoryId: string): Promise<ICategory> {
        const category = mockCategories.find(c => c.id === categoryId);
        
        if (!category) {
            throw new Error(`Category with ID ${categoryId} not found`);
        }
        
        return category;
    }

    // Get child categories (subcategories)
    async getChildCategories(parentId: string): Promise<ICategory[]> {
        return mockCategories.filter(c => c.parentId === parentId);
    }

    // Create a new category
    async createCategory(categoryData: Omit<ICategory, 'id' | 'createdDate' | 'updatedDate'>): Promise<ICategory> {
        const date = new Date().toISOString();
        const newCategory: ICategory = {
            ...categoryData,
            id: `cat${Math.random().toString(36).substring(2, 7)}`,
            createdDate: date,
            updatedDate: date
        };
        
        mockCategories.push(newCategory);
        return newCategory;
    }

    // Update an existing category
    async updateCategory(categoryId: string, categoryData: Partial<ICategory>): Promise<ICategory> {
        const index = mockCategories.findIndex(c => c.id === categoryId);
        
        if (index === -1) {
            throw new Error(`Category with ID ${categoryId} not found`);
        }
        
        const updatedCategory: ICategory = {
            ...mockCategories[index],
            ...categoryData,
            updatedDate: new Date().toISOString()
        };
        
        mockCategories[index] = updatedCategory;
        return updatedCategory;
    }

    // Delete a category
    async deleteCategory(categoryId: string): Promise<boolean> {
        // Check if this category has subcategories
        const hasChildren = mockCategories.some(c => c.parentId === categoryId);
        
        if (hasChildren) {
            throw new Error(`Cannot delete category with ID ${categoryId} because it has subcategories`);
        }
        
        const initialLength = mockCategories.length;
        mockCategories = mockCategories.filter(c => c.id !== categoryId);
        
        return mockCategories.length !== initialLength;
    }
}

export const categoryService = new CategoryService(); 