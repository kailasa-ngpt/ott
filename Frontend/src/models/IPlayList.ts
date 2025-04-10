export interface IPlayList extends Document {
    id: string;                    
    name: string;                  
    description: string;           
    thumbnailPath: string;         
    createdDate: string;          
    updatedDate: string;          
    videos: {
        id: string;
        thumbnail: string;
        videoTitle: string;
        videoLink: string;
        createdDate: string;
        views: number;
    }[];              
}

  
  