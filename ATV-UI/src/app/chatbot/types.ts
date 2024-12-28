export interface Message {
    content: string;
    timestamp: Date;
    sender: 'user' | 'bot';
    type?: 'warning' | 'info' | 'error';
}