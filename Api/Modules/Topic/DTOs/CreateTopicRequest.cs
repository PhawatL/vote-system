namespace Api.Features.Topic.DTOs;

public class CreateTopicRequest
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required List<string> Options { get; set; }
}
