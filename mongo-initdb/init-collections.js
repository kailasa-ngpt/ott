db.createCollection("videos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "title"], // Removed video_url and video_length since your code uses different field names
        properties: {
          id: { bsonType: "string" },
          title: { bsonType: "string" },
          description: { bsonType: "string" },
          uploadDate: { bsonType: "string" }, // Changed from upload_date to match your model
          categories: {
            bsonType: "array",
            items: { bsonType: "string" } // Changed from objectId to string to match your model
          },
          viewStatus: { bsonType: "string", enum: ["public", "private", "unlisted"] }, // Changed from viewing_status and added unlisted
          views: { bsonType: "int" },
          videoLength: { bsonType: "int" }, // Changed from video_length to match your model
          tags: { bsonType: "array", items: { bsonType: "string" } },
          loves: { bsonType: "int" } // Changed from likes to match your model
        }
      }
    }
  });

  db.createCollection("playlists", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "name", "createdDate", "updatedDate"],
        properties: {
          id: { bsonType: "string" },
          name: { bsonType: "string" },
          description: { bsonType: "string" },
          thumbnailPath: { bsonType: "string" },
          videos: {
            bsonType: "array",
            items: { bsonType: "string" }
          },
          createdDate: { bsonType: "string" },
          updatedDate: { bsonType: "string" }
        }
      }
    }
  });

  // Create indexes
  db.videos.createIndex({ "id": 1 }, { unique: true });
  db.playlists.createIndex({ "id": 1 }, { unique: true });

  db.createCollection("categories", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "name", "createdDate", "updatedDate"],
        properties: {
          id: { bsonType: "string" },
          name: { bsonType: "string" },
          description: { bsonType: "string" },
          parentId: { bsonType: "string" },
          createdDate: { bsonType: "string" },
          updatedDate: { bsonType: "string" }
        }
      }
    }
  });

  db.createCollection("tags", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "name", "createdDate", "updatedDate"],
        properties: {
          id: { bsonType: "string" },
          name: { bsonType: "string" },
          createdDate: { bsonType: "string" },
          updatedDate: { bsonType: "string" }
        }
      }
    }
  });

  db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password"],
        properties: {
          username: { bsonType: "string" },
          email: { bsonType: "string" },
          password: { bsonType: "string" },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        }
      }
    }
  });

  // Users collection indexes
  db.users.createIndex({ username: 1 }, { unique: true });
  db.users.createIndex({ email: 1 }, { unique: true });

  // Videos collection indexes
  db.videos.createIndex({ title: "text", description: "text" });
  db.videos.createIndex({ uploadedBy: 1 });

  // Playlists collection indexes
  db.playlists.createIndex({ user: 1 });

  // Categories collection indexes
  db.categories.createIndex({ "id": 1 }, { unique: true });
  db.categories.createIndex({ category_name: 1 }, { unique: true });

  // Tags collection indexes
  db.tags.createIndex({ "id": 1 }, { unique: true });

  // Console output for verification
  print("Database collections and indexes created successfully!");