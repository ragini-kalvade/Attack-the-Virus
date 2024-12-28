import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoginPageComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent implements AfterViewInit, OnInit {

  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;

  @ViewChild('backgroundMusic') backgroundMusic!: ElementRef<HTMLAudioElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.backgroundVideo.nativeElement.addEventListener('ended', () => {
      this.backgroundVideo.nativeElement.currentTime = 0;
      this.backgroundVideo.nativeElement.play();
    });
  }

  ngOnInit(): void {
    this.playBackgroundMusic();
  }

  playBackgroundMusic(): void {
    const audio = this.backgroundMusic.nativeElement;
    audio.volume = 0.5; // Set volume to a moderate level
    audio.play().catch(error => {
      console.log('Autoplay failed, possibly due to browser restrictions:', error);
    });
  }

  pauseBackgroundMusic(): void {
    this.backgroundMusic.nativeElement.pause();
  }

  title = 'ATV-UI';
}

