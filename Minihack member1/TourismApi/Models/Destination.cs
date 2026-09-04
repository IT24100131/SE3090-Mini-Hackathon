using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TourismApi.Models
{
    public class Destination
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("location")]
        public string Location { get; set; } = null!;

        [BsonElement("category")]
        public string Category { get; set; } = null!;

        [BsonElement("description")]
        public string Description { get; set; } = null!;

        [BsonElement("imageUrl")]
        public string? ImageUrl { get; set; }
    }
}