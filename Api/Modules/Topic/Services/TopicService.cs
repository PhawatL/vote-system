using Api.Features.Topic.DTOs;
using Api.Shared.Models;
using TopicModel = Api.Shared.Models.Topic;
using Api.Shared.Repositories;

namespace Api.Features.Topic.Services;

public class TopicService(TopicRepository topicRepository, OptionRepository optionRepository) : ITopicService
{
    public async Task<TopicResponse?> GetTopicByIdAsync(int id)
    {
        var topic = await topicRepository.GetByIdAsync(id);
        return topic == null ? null : MapToResponse(topic);
    }

    public async Task<List<TopicResponse>> GetTopicsAsync(int page, int size)
    {
        var topics = await topicRepository.GetPagedAsync(page, size);
        return topics.Select(MapToResponse
        ).ToList();
    }

    public async Task<TopicResponse> CreateTopicAsync(CreateTopicRequest request)
    {
        var topic = new TopicModel
        {
            Name = request.Name,
            Description = request.Description,
        };

        await topicRepository.AddAsync(topic);

        for (var i = 0; i < request.Options.Count; i++)
        {
            var option = new Option
            {
                TopicId = topic.Id,
                Name = request.Options[i],
                Order = i,
                Vote = 0
            };
            await optionRepository.AddAsync(option);
        }
        await topicRepository.SaveAsync();
        return MapToResponse(topic);
    }

    private static TopicResponse MapToResponse(TopicModel topic)
    {
        return new TopicResponse
        {
            Id = topic.Id,
            Name = topic.Name,
            Description = topic.Description,
            CreatedAt = topic.CreatedAt,
            Options = topic.Options
                .OrderBy(o => o.Order)
                .Select(o => new OptionResponseDto
                {
                    Id = o.Id,
                    Name = o.Name,
                    Order = o.Order,
                    Vote = o.Vote
                })
                .ToList()
        };
    }
}