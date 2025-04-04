// Users collection
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

// Videos collection
db.videos.createIndex({ title: "text", description:"text" });
db.videos.createIndex({ uploadedBy : 1 });

// Playlists collection
db.playlists.createIndex({ user : 1 });

// Categories collection
db.categories.createIndex({ category_name : 1 }, { unique : true });
