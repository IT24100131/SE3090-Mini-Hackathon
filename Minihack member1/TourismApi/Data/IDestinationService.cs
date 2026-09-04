using TourismApi.Models;

namespace TourismApi.Data
{
    public interface IDestinationService
    {
        Task<List<Destination>> GetAllAsync();
        Task<Destination?> GetByIdAsync(string id);
        Task CreateAsync(Destination destination);
        Task UpdateAsync(string id, Destination destination);
        Task DeleteAsync(string id);
    }
}