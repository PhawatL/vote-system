namespace Api.Features.Vote.DTOs;

public class VoteResponse
{
    public int OptionId { get; set; }
    public int TopicId { get; set; }
    public string Message { get; set; } = "Vote recorded successfully";
}
