export interface IPlayList extends Document {
    id: string;                    
    name: string;                  
    description: string;           
    thumbnailPath: string;         
    videos: string[];             
    createdDate: string;          
    updatedDate: string;          
}

  
  