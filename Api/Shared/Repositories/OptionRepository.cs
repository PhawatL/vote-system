using Api.Shared.Data;
using Api.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Shared.Repositories;

public class OptionRepository(VoteAppDbContext context)
{
    private readonly DbSet<Option> _dbSet = context.Set<Option>();

    public async Task<Option?> GetByIdAsync(int id)
    {
        return await _dbSet.FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task AddAsync(Option entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Option option)
    {
        _dbSet.Update(option);
        await context.SaveChangesAsync();
    }
}
