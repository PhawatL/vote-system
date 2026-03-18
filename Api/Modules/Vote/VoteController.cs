using Api.Features.Vote.DTOs;
using Api.Features.Vote.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Features.Vote.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VotesController(IVoteService voteService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<VoteResponse>> CreateVote([FromBody] CreateVoteRequest request)
    {
        var success = await voteService.CreateVoteAsync(request);
        if (!success)
            return NotFound("Topic or Option not found");

        return Ok(new VoteResponse
        {
            TopicId = request.TopicId,
            OptionId = request.OptionId
        });
    }

}
