namespace Api.Shared.Models;

public class Option
{
    public int Id { get; set; }
    public int TopicId { get; set; }
    public required string Name { get; set; }
    public int Order { get; set; }
    public int Vote { get; set; } = 0;
    
    public Topic? Topic { get; set; }
}
