namespace Api.Features.Topic.DTOs;

public class OptionResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Order { get; set; }
    public int Vote { get; set; }
}

public class TopicResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OptionResponseDto> Options { get; set; } = [];
}
