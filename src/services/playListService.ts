//temp data. This will be replaced with actual API call to fetch data from server
const sampleThumbnailVideos = [
    {
      thumbnailPath: "/ThumbnailImages/sampleImage1.png",
      videoTitle: "Sample Video1",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 9, 2025",
      views: 12345,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage2.png",
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
  ];

  const sampleThumbnailVideos2 = [
    {
      thumbnailPath: "/ThumbnailImages/sampleImage1.png",
      videoTitle: "Sample Video ABC",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 9, 2025",
      views: 12345,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage2.png",
      videoTitle: "Sample Video XYZ",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 10, 2025",
      views: 12355,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage3.png",
      videoTitle: "Sample Video PQR",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 11, 2025",
      views: 12365,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage4.png",
      videoTitle: "Sample Video LMN",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 12, 2025",
      views: 12375,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage5.png",
      videoTitle: "Sample Video EFG",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 13, 2025",
      views: 12385,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage6.png",
      videoTitle: "Sample Video HIJ",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 14, 2025",
      views: 12395,
    },
    {
      thumbnailPath: "/ThumbnailImages/sampleImage7.png",
      videoTitle: "Sample Video KLM",
      videoLink: "https://www.youtube.com/watch?v=43HMoUIj830",
      createdDate: "Jan 15, 2025",
      views: 2235,
    },
  ];
  
  //delete following block of code later as we make the actual call. This is just for testing
  export const getThumbnails = async (playlistId :string) => {
    // Simulate API delay with a Promise
    if(playlistId === "playlistId1"){
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(sampleThumbnailVideos);
        }, 50); // 50ms delay for realism
      });
    }
    else
    {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(sampleThumbnailVideos2);
        }, 50); // 50ms delay for realism
      });
    }
  };


  // actual code for calling API to fetch data from server:
  // export const getThumbnailsByCategory = async (category: string) => {
  //   const response = await fetch(`/api/videos?category=${category}`);
  //   const data = await response.json();
  //   return data;
  // };

  //delete following block of code later as we make the actual call. This is just for testing.
  export const getPlaylistIds = async (userId :string) => {
    // Simulate API delay with a Promise
    if(userId === "123"){
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["playlistId1", "playlistId2", "playlistId3"]);
        }, 50); // 50ms delay for realism
      });
    }
    else
    {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["playlistId4", "playlistId5"]);
        }, 50); // 50ms delay for realism
      });
    }
  }
  