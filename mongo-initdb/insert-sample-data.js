// mongo-initdb/insert-sample-data.js
// This script will run after the collections are created

// Add sample videos first (since playlists reference them)
const sampleVideos = [
  {
    id: "video-123",
    title: "Introduction to Meditation",
    description: "A beginner's guide to meditation techniques",
    uploadDate: new Date().toISOString(),
    viewStatus: "public",
    videoLength: 720, // 12 minutes in seconds
    views: 0,
    loves: 0,
    categories: ["meditation", "spiritual"],
    tags: ["meditation", "beginner", "spiritual"]
  },
  {
    id: "video-456",
    title: "Advanced Meditation Practices",
    description: "Deep dive into advanced meditation techniques",
    uploadDate: new Date().toISOString(),
    viewStatus: "public",
    videoLength: 1500, // 25 minutes in seconds
    views: 0,
    loves: 0,
    categories: ["meditation", "spiritual"],
    tags: ["meditation", "advanced", "spiritual"]
  },
  {
    id: "video-789",
    title: "Spiritual Guidance Session",
    description: "A session on spiritual guidance and awareness",
    uploadDate: new Date().toISOString(),
    viewStatus: "public",
    videoLength: 1800, // 30 minutes in seconds
    views: 0,
    loves: 0,
    categories: ["spiritual", "guidance"],
    tags: ["spiritual", "guidance", "awareness"]
  }
];

// Insert videos (if they don't already exist)
try {
  db.videos.insertMany(sampleVideos, { ordered: false });
  print("Sample videos inserted successfully!");
} catch (e) {
  print("Some video insertions failed (likely due to duplicates): " + e.message);
}

// Create a sample playlist with references to the videos
const samplePlaylist = {
  id: "sample-playlist-1",
  name: "Meditation Essentials",
  description: "Essential meditation videos for beginners",
  thumbnailPath: "",
  videos: ["video-123", "video-456"], // References to video IDs
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString()
};

// Insert playlist
try {
  db.playlists.insertOne(samplePlaylist);
  print("Sample playlist inserted successfully!");
} catch (e) {
  print("Error inserting sample playlist: " + e.message);
}

print("Sample data initialization complete!");