import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, CreateTopicPayload } from '../../services/api.service';

@Component({
	selector: 'app-create-topic-form',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './create-topic-form.component.html',
	styleUrl: './create-topic-form.component.scss'
})
export class CreateTopicFormComponent {
	@Output() topicCreated = new EventEmitter<void>();

	topicName = '';
	topicDescription = '';
	topicOptions = ['', ''];
	createError = '';
	createSuccess = '';
	isCreatingTopic = false;

	constructor(private readonly apiService: ApiService) {}

	addOptionField(): void {
		this.topicOptions.push('');
	}

	removeOptionField(index: number): void {
		if (this.topicOptions.length <= 2) {
			return;
		}

		this.topicOptions.splice(index, 1);
	}

	submitCreateTopic(): void {
		this.createError = '';
		this.createSuccess = '';

		const payload = this.buildCreateTopicPayload();
		if (!payload) {
			return;
		}

		this.isCreatingTopic = true;
		this.apiService.createTopic(payload).subscribe({
			next: () => {
				this.isCreatingTopic = false;
				this.createSuccess = 'สร้าง topic สำเร็จ';
				this.topicName = '';
				this.topicDescription = '';
				this.topicOptions = ['', ''];
				this.topicCreated.emit();
			},
			error: () => {
				this.isCreatingTopic = false;
				this.createError = 'สร้าง topic ไม่สำเร็จ กรุณาตรวจสอบข้อมูลแล้วลองใหม่';
			}
		});
	}

	private buildCreateTopicPayload(): CreateTopicPayload | null {
		const name = this.topicName.trim();
		const description = this.topicDescription.trim();
		const options = this.topicOptions.map((option) => option.trim()).filter((option) => option);

		if (!name) {
			this.createError = 'กรุณาระบุชื่อ topic';
			return null;
		}

		if (!description) {
			this.createError = 'กรุณาระบุรายละเอียด topic';
			return null;
		}

		if (options.length < 2) {
			this.createError = 'ต้องมีตัวเลือกอย่างน้อย 2 ข้อ';
			return null;
		}

		return {
			name,
			description,
			options
		};
	}
}
