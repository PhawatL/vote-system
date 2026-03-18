using Api.Shared.Data;
using Api.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Shared.Repositories;

public class TopicRepository(VoteAppDbContext context)
{
    private readonly DbSet<Topic> _db = context.Set<Topic>();

    public async Task<Topic?> GetByIdAsync(int id)
    {
        return await _db.Include(t => t.Options).FirstAsync(t => t.Id == id);
    }

    public async Task<List<Topic>> GetAllAsync()
    {
        return await _db.Include(t => t.Options).ToListAsync();
    }

    public async Task<List<Topic>> GetPagedAsync(int page, int size)
    {
        return await _db
            .Include(t => t.Options)
            .OrderByDescending(t => t.CreatedAt)
            .Skip(page * size)
            .Take(size) 
            .ToListAsync();
    }

    public async Task AddAsync(Topic entity)
    {
        await _db.AddAsync(entity);
        await context.SaveChangesAsync();
    }
    
    public async Task SaveAsync()
    {
        await context.SaveChangesAsync();
    }
}
