namespace Api.Shared.Models;

public class Topic
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Option> Options { get; set; } = [];
}
