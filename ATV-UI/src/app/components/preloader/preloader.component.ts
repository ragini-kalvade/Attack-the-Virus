import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preloader-container" [@fadeInOut]="state">
      <div class="loader-content">
        <div class="dna-loader">
          <div class="strand"></div>
          <div class="strand"></div>
          <div class="strand"></div>
          <div class="strand"></div>
          <div class="strand"></div>
        </div>
        <h2 class="loading-text">{{ loadingText }}</h2>
        <div class="progress-bar">
          <div class="progress" [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .preloader-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 51, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .loader-content {
      text-align: center;
    }

    .loading-text {
      font-family: 'Orbitron', sans-serif;
      color: #5FF3FF;
      font-size: 1.5rem;
      margin: 2rem 0;
      text-shadow: 0 0 10px rgba(95, 243, 255, 0.5);
    }

    .progress-bar {
      width: 300px;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin: 1rem auto;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #00ff00, #5FF3FF);
      transition: width 0.3s ease;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }

    .dna-loader {
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    .strand {
      width: 4px;
      height: 100px;
      background: #00ff00;
      animation: dnaLoading 1.5s ease-in-out infinite;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }

    .strand:nth-child(2) { animation-delay: 0.1s; }
    .strand:nth-child(3) { animation-delay: 0.2s; }
    .strand:nth-child(4) { animation-delay: 0.3s; }
    .strand:nth-child(5) { animation-delay: 0.4s; }

    @keyframes dnaLoading {
      0%, 100% { transform: scaleY(0.5); }
      50% { transform: scaleY(1); }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('in', style({ opacity: 1 })),
      transition('void => in', animate('300ms ease-out')),
      transition('in => void', animate('300ms ease-in'))
    ])
  ]
})
export class PreloaderComponent implements OnInit {
  progress = 0;
  state = 'in';
  loadingText = 'Initializing Mission...';
  private readonly loadingTexts = [
    'Initializing Mission...',
    'Loading Vaccine Database...',
    'Calibrating Defense Systems...',
    'Preparing Virtual Environment...'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.startLoading();
  }

  private startLoading() {
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % this.loadingTexts.length;
      this.loadingText = this.loadingTexts[textIndex];
    }, 1500);

    const interval = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        clearInterval(interval);
        clearInterval(textInterval);
        this.state = 'void';
        setTimeout(() => {
          this.router.navigate(['/quiz']);
        }, 300);
      }
    }, 50);
  }
}