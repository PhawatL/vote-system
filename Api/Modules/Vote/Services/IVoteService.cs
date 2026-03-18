using Api.Features.Vote.DTOs;

namespace Api.Features.Vote.Services;

public interface IVoteService
{
    Task<bool> CreateVoteAsync(CreateVoteRequest request);
}
