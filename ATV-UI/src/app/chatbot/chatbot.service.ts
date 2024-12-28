import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './types';
import { environment } from '../environments';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private readonly apiUrl = environment.chatGPTUrl;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.addBotMessage("Welcome to ATV Assistant! I'm here to help you stay healthy and protect against viruses. What health concerns can I help you with today?");
  }

  private addBotMessage(content: string, type?: 'warning' | 'info' | 'error') {
    const messages = this.messagesSubject.value;
    messages.push({
      content,
      timestamp: new Date(),
      sender: 'bot',
      type
    });
    this.messagesSubject.next(messages);
  }

  async sendMessage(userMessage: string): Promise<void> {
    const messages = this.messagesSubject.value;
    messages.push({
      content: userMessage,
      timestamp: new Date(),
      sender: 'user'
    });
    this.messagesSubject.next(messages);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${environment.openaiApiKey}`);

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an advanced medical AI assistant called ATV Assistant (Attack The Virus Assistant).
          Your core mission is to provide scientifically accurate, preventative health guidance focused on virus protection.

          Key Guidelines:
          - Provide clear, actionable health protection strategies
          - Emphasize evidence-based prevention techniques
          - Offer concise, easy-to-understand health advice
          - Highlight importance of personal and community health
          - Recommend professional medical consultation for specific health concerns
          - Maintain a professional, supportive, and empowering tone

          Communication Style:
          - Use simple, clear medical language
          - Break down complex health concepts
          - Provide step-by-step prevention strategies
          - Show empathy and understanding
          - Always prioritize user's health and safety`
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    try {
      const response = await this.http.post<any>(this.apiUrl, body, { headers }).toPromise();
      this.addBotMessage(response.choices[0].message.content);
    } catch (error) {
      this.addBotMessage('I apologize, but I\'m experiencing a connection issue. Please try again or consult a healthcare professional.', 'error');
      console.error('ChatGPT API Error:', error);
    }
  }
}
