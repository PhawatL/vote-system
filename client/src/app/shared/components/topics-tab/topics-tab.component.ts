import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Topic } from '../../services/api.service';

@Component({
	selector: 'app-topics-tab',
	standalone: true,
	imports: [CommonModule, FormsModule, NgbPaginationModule],
	templateUrl: './topics-tab.component.html',
	styleUrl: './topics-tab.component.scss'
})
export class TopicsTabComponent {
	@Input() isLoadingTopics = false;
	@Input() topicsError = '';
	@Input() topics: Topic[] = [];
	@Input() page = 1;
	@Input() pageSize = 5;
	@Input() pageSizeOptions: number[] = [5, 10, 20];
	@Input() totalForPagination = 0;
	@Input() votedMap: Record<number, number> = {};

	@Output() topicSelected = new EventEmitter<Topic>();
	@Output() pageChanged = new EventEmitter<number>();
	@Output() pageSizeChanged = new EventEmitter<number>();

	onOpenTopic(topic: Topic): void {
		this.topicSelected.emit(topic);
	}

	onPageChange(page: number): void {
		this.pageChanged.emit(page);
	}

	onPageSizeChange(pageSize: number): void {
		this.pageSizeChanged.emit(pageSize);
	}

	hasVoted(topicId: number): boolean {
		return this.votedMap[topicId] !== undefined;
	}

	getTopicTotalVotes(topic: Topic): number {
		return topic.options.reduce((sum, option) => sum + option.vote, 0);
	}
}
