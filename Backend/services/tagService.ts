import { ITag } from '../models/ITag';

// This is a temporary mock database for development
let mockTags: ITag[] = [
    {
        id: "tag1",
        name: "Spirituality",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "tag2",
        name: "Consciousness",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "tag3",
        name: "Wisdom",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    }
];

export class TagService {
    // Get all tags
    async getAllTags(): Promise<ITag[]> {
        return mockTags;
    }

    // Get a tag by ID
    async getTag(tagId: string): Promise<ITag> {
        const tag = mockTags.find(t => t.id === tagId);
        
        if (!tag) {
            throw new Error(`Tag with ID ${tagId} not found`);
        }
        
        return tag;
    }

    // Create a new tag
    async createTag(tagData: Omit<ITag, 'id' | 'createdDate' | 'updatedDate'>): Promise<ITag> {
        const date = new Date().toISOString();
        const newTag: ITag = {
            ...tagData,
            id: `tag${Math.random().toString(36).substring(2, 7)}`,
            createdDate: date,
            updatedDate: date
        };
        
        mockTags.push(newTag);
        return newTag;
    }

    // Update an existing tag
    async updateTag(tagId: string, tagData: Partial<ITag>): Promise<ITag> {
        const index = mockTags.findIndex(t => t.id === tagId);
        
        if (index === -1) {
            throw new Error(`Tag with ID ${tagId} not found`);
        }
        
        const updatedTag: ITag = {
            ...mockTags[index],
            ...tagData,
            updatedDate: new Date().toISOString()
        };
        
        mockTags[index] = updatedTag;
        return updatedTag;
    }

    // Delete a tag
    async deleteTag(tagId: string): Promise<boolean> {
        const initialLength = mockTags.length;
        mockTags = mockTags.filter(t => t.id !== tagId);
        
        return mockTags.length !== initialLength;
    }
}

export const tagService = new TagService(); 