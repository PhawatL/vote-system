import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TopicOption {
	id: number;
	name: string;
	order: number;
	vote: number;
}

export interface Topic {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	options: TopicOption[];
}

export interface CreateTopicPayload {
	name: string;
	description: string;
	options: string[];
}

export interface VotePayload {
	topicId: number;
	optionId: number;
}

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private readonly apiBaseUrl = 'http://localhost:5131/api';

	constructor(private readonly http: HttpClient) {}

	getTopics(page: number, size: number): Observable<Topic[]> {
		return this.http.get<Topic[]>(`${this.apiBaseUrl}/topics`, {
			params: {
				page,
				size
			}
		});
	}

	getTopicById(topicId: number): Observable<Topic> {
		return this.http.get<Topic>(`${this.apiBaseUrl}/topics/${topicId}`);
	}

	createTopic(payload: CreateTopicPayload): Observable<Topic> {
		return this.http.post<Topic>(`${this.apiBaseUrl}/topics`, payload);
	}

	vote(payload: VotePayload): Observable<unknown> {
		return this.http.post(`${this.apiBaseUrl}/votes`, payload);
	}
}
