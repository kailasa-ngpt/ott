import connectDB from './config/db';
import Playlist from './models/Playlist';

const testConnection = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Successfully connected to MongoDB');

        // Test creating a playlist
        const testPlaylist = new Playlist({
            id: "PL21WI5_pNwj5QaRIWKUaSDRRU9NLuEGAk",
            name: "eNHealth",
            description: "EnHealth Programs",
            thumbnailPath: "/thumbnails/PL21WI5_pNwj5QaRIWKUaSDRRU9NLuEGAk.jpg",
            videos: ["video1", "video2", "video3"],
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        });

        await testPlaylist.save();
        console.log('Successfully created test playlist');

        // Test finding playlists
        const playlists = await Playlist.find();
        console.log('Found playlists:', playlists);

        // Clean up test data
        await Playlist.deleteOne({ id: "PL21WI5_pNwj5QaRIWKUaSDRRU9NLuEGAk" });
        console.log('Successfully cleaned up test data');

        console.log('All tests passed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
};

testConnection(); 