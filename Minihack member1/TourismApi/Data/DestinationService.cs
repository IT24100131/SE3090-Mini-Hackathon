using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TourismApi.Models;

namespace TourismApi.Data
{
    public class DestinationService : IDestinationService
    {
        private readonly IMongoCollection<Destination> _destinations;

        public DestinationService(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _destinations = database.GetCollection<Destination>("Destinations");
        }

        public async Task<List<Destination>> GetAllAsync() =>
            await _destinations.Find(_ => true).ToListAsync();

        public async Task<Destination?> GetByIdAsync(string id) =>
            await _destinations.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Destination destination) =>
            await _destinations.InsertOneAsync(destination);

        public async Task UpdateAsync(string id, Destination destination) =>
            await _destinations.ReplaceOneAsync(x => x.Id == id, destination);

        public async Task DeleteAsync(string id) =>
            await _destinations.DeleteOneAsync(x => x.Id == id);
    }
}