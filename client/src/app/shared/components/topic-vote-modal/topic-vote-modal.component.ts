import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { Topic, TopicOption } from '../../services/api.service';

@Component({
	selector: 'app-topic-vote-modal',
	standalone: true,
	imports: [CommonModule, NgbProgressbarModule],
	templateUrl: './topic-vote-modal.component.html',
	styleUrl: './topic-vote-modal.component.scss'
})
export class TopicVoteModalComponent {
	@Input() selectedTopic: Topic | null = null;
	@Input() selectedOptionId: number | null = null;
	@Input() isVoting = false;
	@Input() voteError = '';
	@Input() votedMap: Record<number, number> = {};

	@Output() selectedOptionIdChange = new EventEmitter<number | null>();
	@Output() vote = new EventEmitter<void>();
	@Output() close = new EventEmitter<void>();

	hasVoted(topicId: number): boolean {
		return this.votedMap[topicId] !== undefined;
	}

	getTopicTotalVotes(topic: Topic): number {
		return topic.options.reduce((sum, option) => sum + option.vote, 0);
	}

	getOptionPercentage(topic: Topic, option: TopicOption): number {
		const totalVotes = this.getTopicTotalVotes(topic);
		if (totalVotes === 0) {
			return 0;
		}

		return (option.vote / totalVotes) * 100;
	}

	onOptionSelect(optionId: number): void {
		this.selectedOptionIdChange.emit(optionId);
	}

	onVote(): void {
		this.vote.emit();
	}

	onClose(): void {
		this.close.emit();
	}
}
