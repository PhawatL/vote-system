import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbModalModule,
  NgbModalRef,
  NgbNavModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  ApiService,
  Topic,
} from './shared/services/api.service';
import { CreateTopicFormComponent } from './shared/components/create-topic-form/create-topic-form.component';
import { TopicVoteModalComponent } from './shared/components/topic-vote-modal/topic-vote-modal.component';
import { TopicsTabComponent } from './shared/components/topics-tab/topics-tab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgbNavModule, NgbModalModule, TopicsTabComponent, CreateTopicFormComponent, TopicVoteModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';

  activeTab: 'topics' | 'create' = 'topics';

  isLoadingTopics = false;
  topicsError = '';
  topics: Topic[] = [];
  page = 1;
  pageSize = 5;
  readonly pageSizeOptions = [5, 10, 20, 50 ,100];
  totalForPagination = 0;

  selectedTopic: Topic | null = null;
  selectedOptionId: number | null = null;
  isVoting = false;
  voteError = '';
  private modalRef: NgbModalRef | null = null;

  voterId = '';
  private readonly voterIdStorageKey = 'vote_app_voter_id';
  private readonly voteMapStoragePrefix = 'vote_app_votes_';
  private votedMap: Record<number, number> = {};

  constructor(
    private readonly apiService: ApiService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initializeVoterId();
    this.loadVotedMap();
    this.loadTopics();
  }

  get canGoPrevPage(): boolean {
    return this.page > 1 && !this.isLoadingTopics;
  }

  get canGoNextPage(): boolean {
    return this.topics.length === this.pageSize && !this.isLoadingTopics;
  }

  get currentVotedMap(): Record<number, number> {
    return this.votedMap;
  }

  setTab(tab: 'topics' | 'create'): void {
    this.activeTab = tab;
    if (tab === 'topics') {
      this.loadTopics();
    }
  }

  loadTopics(): void {
    this.isLoadingTopics = true;
    this.topicsError = '';

    this.apiService.getTopics(this.page - 1, this.pageSize).subscribe({
      next: (topics) => {
        this.topics = topics;
        this.totalForPagination = (this.page - 1) * this.pageSize + topics.length + (topics.length === this.pageSize ? 1 : 0);
        this.isLoadingTopics = false;
      },
      error: () => {
        this.topicsError = 'โหลด topic ไม่สำเร็จ กรุณาลองใหม่';
        this.isLoadingTopics = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (page === this.page) {
      return;
    }

    this.page = page;
    this.loadTopics();
  }

  onPageSizeChange(pageSize: number): void {
    if (pageSize === this.pageSize) {
      return;
    }

    this.pageSize = pageSize;
    this.page = 1;
    this.loadTopics();
  }

  openTopicModal(topic: Topic, modalTemplate: TemplateRef<unknown>): void {
    this.selectedTopic = topic;
    this.selectedOptionId = this.votedMap[topic.id] ?? null;
    this.voteError = '';

    this.modalRef = this.modalService.open(modalTemplate, {
      centered: true,
      size: 'lg'
    });

    this.modalRef.result.finally(() => {
      this.resetModalState();
      this.modalRef = null;
    });
  }

  closeTopicModal(): void {
    this.modalRef?.close();
  }

  private resetModalState(): void {
    this.selectedTopic = null;
    this.selectedOptionId = null;
    this.voteError = '';
  }

  hasVoted(topicId: number): boolean {
    return this.votedMap[topicId] !== undefined;
  }

  voteSelectedOption(): void {
    if (!this.selectedTopic || this.selectedOptionId === null) {
      return;
    }

    if (this.hasVoted(this.selectedTopic.id)) {
      this.voteError = 'คุณโหวต topic นี้ไปแล้ว';
      return;
    }

    this.isVoting = true;
    this.voteError = '';

    this.apiService
      .vote({
        topicId: this.selectedTopic.id,
        optionId: this.selectedOptionId
      })
      .subscribe({
        next: () => {
          this.votedMap[this.selectedTopic!.id] = this.selectedOptionId!;
          this.saveVotedMap();
          this.refreshTopicAfterVote(this.selectedTopic!.id);
        },
        error: () => {
          this.voteError = 'โหวตไม่สำเร็จ กรุณาลองใหม่';
          this.isVoting = false;
        }
      });
  }


  onTopicCreated(): void {
    this.activeTab = 'topics';
    this.page = 1;
    this.loadTopics();
  }

  private initializeVoterId(): void {
    const existingVoterId = localStorage.getItem(this.voterIdStorageKey);
    if (existingVoterId) {
      this.voterId = existingVoterId;
      return;
    }

    this.voterId = this.generateVoterId();
    localStorage.setItem(this.voterIdStorageKey, this.voterId);
  }

  private generateVoterId(): string {
    const randomUUID = (window as Window & { crypto?: Crypto }).crypto?.randomUUID;
    if (randomUUID) {
      return randomUUID.call(window.crypto);
    }

    return `voter_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
  }

  private get voteMapStorageKey(): string {
    return `${this.voteMapStoragePrefix}${this.voterId}`;
  }

  private loadVotedMap(): void {
    const rawVoteMap = localStorage.getItem(this.voteMapStorageKey);
    if (!rawVoteMap) {
      this.votedMap = {};
      return;
    }

    try {
      const parsedVoteMap = JSON.parse(rawVoteMap) as Record<string, number>;
      this.votedMap = Object.entries(parsedVoteMap).reduce<Record<number, number>>((accumulator, [topicId, optionId]) => {
        const parsedTopicId = Number(topicId);
        if (!Number.isNaN(parsedTopicId)) {
          accumulator[parsedTopicId] = optionId;
        }
        return accumulator;
      }, {});
    } catch {
      this.votedMap = {};
    }
  }

  private saveVotedMap(): void {
    localStorage.setItem(this.voteMapStorageKey, JSON.stringify(this.votedMap));
  }

  private refreshTopicAfterVote(topicId: number): void {
    this.apiService.getTopicById(topicId).subscribe({
      next: (topic) => {
        this.selectedTopic = topic;

        this.topics = this.topics.map((item) => (item.id === topic.id ? topic : item));
        this.isVoting = false;
      },
      error: () => {
        this.loadTopics();
        this.isVoting = false;
      }
    });
  }
}
