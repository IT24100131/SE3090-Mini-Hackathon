namespace TourismApi.DTOs
{
    public class CreateDestinationDto
    {
        public string Name { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; }
    }
}