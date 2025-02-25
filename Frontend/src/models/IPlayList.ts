export interface IPlayList {
    playlistId: string;
    playListTitle: string;
    playListContent: {
        id: string;
        thumbnailPath: string;
        videoTitle: string;
        videoLink: string;
        createdDate: string;
        views: number;
    }[];
}

  
  