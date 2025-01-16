//temp data. This will be replaced with actual API call to fetch data from server
  export const getPlayListsByUserId = async (userId: string): Promise<IPlayList[]> => {
    return new Promise((resolve) => {
      setTimeout(()=>{
        resolve(
          [
            {
              playlistId: "playlistId1",
              playListTitle: "Playlist1",
              videos: 
              [
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage2.png",
                  videoTitle: "Sample Video for playlist upper",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 9, 2025",
                  views: 12345,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage1.png",
                  videoTitle: "Sample Video2",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 10, 2025",
                  views: 12355,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage3.png",
                  videoTitle: "Sample Video3",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 11, 2025",
                  views: 12365,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage4.png",
                  videoTitle: "Sample Video4",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 12, 2025",
                  views: 12375,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage5.png",
                  videoTitle: "Sample Video5",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 13, 2025",
                  views: 12385,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage6.png",
                  videoTitle: "Sample Video6",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 14, 2025",
                  views: 12395,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage7.png",
                  videoTitle: "Sample Video7",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 15, 2025",
                  views: 2235,
                },
              ]
            }, 
            {
              playlistId: "playlistId2",
              playListTitle: "Playlist2",
              videos: 
              [
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage1.png",
                  videoTitle: "Sample Video for playlist lower",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 9, 2025",
                  views: 12345,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage2.png",
                  videoTitle: "Sample Video xyz",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 10, 2025",
                  views: 12355,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage3.png",
                  videoTitle: "Sample Video pqr",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 11, 2025",
                  views: 12365,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage4.png",
                  videoTitle: "Sample Video lmn",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 12, 2025",
                  views: 12375,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage5.png",
                  videoTitle: "Sample Video efg",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 13, 2025",
                  views: 12385,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage6.png",
                  videoTitle: "Sample Video hij",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 14, 2025",
                  views: 12395,
                },
                {
                  thumbnailPath: "/ThumbnailImages/sampleImage7.png",
                  videoTitle: "Sample Video klm",
                  videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
                  createdDate: "Jan 15, 2025",
                  views: 2235,
                },
              ]
            }
          ]
        );
      }, 500);
    });
  }
  

  export interface IPlayList {
    playlistId: string;
    playListTitle: string;
    videos: {
      thumbnailPath: string;
      videoTitle: string;
      videoLink: string;
      createdDate: string;
      views: number;
    }[];
  }