import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define types for messages and chat history
type Message = {
  text: string;
  sender: 'user' | 'bot';
};

type ChatHistory = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- ADDED required modules
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.scss']  // <-- CORRECTED to styleUrls (plural)
})
export class Chatbot implements AfterViewChecked { // <-- RENAMED class to Chatbot
  @ViewChild('chatBody') private chatBodyContainer!: ElementRef;

  isChatOpen = false;
  isThinking = false;
  userInput = '';
  messages: Message[] = [];
  chatHistory: ChatHistory[] = [];

  private readonly API_KEY = ""; // Leave this empty
  private readonly API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${this.API_KEY}`;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChatWidget() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen && this.messages.length === 0) {
      const initialMessage = 'Hello I am a PMS assistant. How can I help you ?';
      this.messages.push({ text: initialMessage, sender: 'bot' });
      this.chatHistory.push({ role: 'model', parts: [{ text: initialMessage }] });
    }
  }

  async handleSendMessage() {
    const userMessageText = this.userInput.trim();
    if (userMessageText === '') return;

    // Add user message to UI and history
    this.messages.push({ text: userMessageText, sender: 'user' });
    this.chatHistory.push({ role: 'user', parts: [{ text: userMessageText }] });
    this.userInput = '';
    this.isThinking = true;

    try {
      const botResponse = await this.callGeminiAPI(this.chatHistory);
      this.messages.push({ text: botResponse, sender: 'bot' });
      this.chatHistory.push({ role: 'model', parts: [{ text: botResponse }] });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      this.messages.push({ text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'bot' });
    } finally {
      this.isThinking = false;
    }
  }

  private async callGeminiAPI(history: ChatHistory[]): Promise<string> {
    const systemInstruction = {
      parts: [{ text: "You are an expert assistant for a website called Publication Management System (PMS). Your goal is to help users (authors, reviewers, editors) understand and use the platform. Be friendly, concise, and helpful. Do not mention that you are an AI. The platform's features include article submission, a peer review system, publishing tools, and analytics." }]
    };

    const payload = {
      contents: history,
      systemInstruction: systemInstruction,
    };

    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Request blocked or response empty:", result.promptFeedback);
      return "I'm sorry, I couldn't generate a response. Please try rephrasing.";
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatBodyContainer.nativeElement.scrollTop = this.chatBodyContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}

