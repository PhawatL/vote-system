namespace Api.Features.Vote.DTOs;

public class CreateVoteRequest
{
    public int TopicId { get; set; }
    public int OptionId { get; set; }
}
