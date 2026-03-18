using Api.Features.Topic.DTOs;

namespace Api.Features.Topic.Services;

public interface ITopicService
{
    Task<TopicResponse?> GetTopicByIdAsync(int id);
    Task<List<TopicResponse>> GetTopicsAsync(int page, int size);
    Task<TopicResponse> CreateTopicAsync(CreateTopicRequest request);
}
