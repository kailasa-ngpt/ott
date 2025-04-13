db.createCollection("videos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "title", "video_url", "video_length"],
        properties: {
          id: { bsonType: "string" },
          title: { bsonType: "string" },
          description: { bsonType: "string" },
          date_of_video: { bsonType: "date" },
          upload_date: { bsonType: "date" },
          categories: {
            bsonType: "array",
            items: { bsonType: "objectId" }
          },
          viewing_status: { bsonType: "string", enum: ["public", "private"] },
          views: { bsonType: "int" },
          video_length: { bsonType: "int" },
          tags: { bsonType: "array", items: { bsonType: "string" } },
          likes: { bsonType: "int" }
        }
      }
    }
  });

  db.createCollection("playlists", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "user"],
        properties: {
          name: { bsonType: "string" },
          user: { bsonType: "objectId" },
          videos: {
            bsonType: "array",
            items: { bsonType: "objectId" }
          },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        }
      }
    }
  });

  db.createCollection("categories", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["category_name"],
        properties: {
          category_name: { bsonType: "string" }
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
