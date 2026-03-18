using Api.Features.Topic.DTOs;
using Api.Features.Topic.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Topic.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TopicsController : ControllerBase
{
    private readonly ITopicService _topicService;

    public TopicsController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TopicResponse>> GetTopic(int id)
    {
        var topic = await _topicService.GetTopicByIdAsync(id);
        if (topic == null)
            return NotFound();

        return Ok(topic);
    }

    [HttpGet]
    public async Task<ActionResult<List<TopicResponse>>> GetTopics([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        var topics = await _topicService.GetTopicsAsync(page, size);
        return Ok(topics);
    }

    [HttpPost]
    public async Task<ActionResult<TopicResponse>> CreateTopic([FromBody] CreateTopicRequest request)
    {
        var topic = await _topicService.CreateTopicAsync(request);
        return Ok(topic);
    }
    
}
