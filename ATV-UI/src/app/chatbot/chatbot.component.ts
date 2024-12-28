import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';

@Component({
selector: 'app-chatbot',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: `./chatbot.component.html`,
styleUrls: ['./chatbot.component.css'],
})

export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private messagesContainer!: ElementRef;

  messages$ = this.chatbotService.messages$;
  newMessage = '';
  isLoading = false;

  constructor(private chatbotService: ChatbotService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  async sendMessage() {
    if (!this.newMessage.trim() || this.isLoading) return;

    const message = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    try {
      await this.chatbotService.sendMessage(message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      this.isLoading = false;
      this.scrollToBottom();
    }
  }
}
