using Api.Features.Vote.DTOs;
using Api.Shared.Repositories;

namespace Api.Features.Vote.Services;

public class VoteService(OptionRepository optionRepository) : IVoteService
{
    public async Task<bool> CreateVoteAsync(CreateVoteRequest request)
    {
        var option = await optionRepository.GetByIdAsync(request.OptionId);
        if (option == null || option.TopicId != request.TopicId)
            return false;

        option.Vote++;
        await optionRepository.UpdateAsync(option);

        return true;
    }

}
