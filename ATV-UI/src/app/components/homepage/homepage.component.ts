import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { PreloaderComponent } from '../preloader/preloader.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, PreloaderComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('* => *', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class HomepageComponent implements OnInit {
  currentIndex = 0;
  isAnimating = false;
  showPreloader = false;

  menuItems = [
    {
      title: "Start Game",
      description: "Begin your mission to learn about viruses",
      icon: "🎮",
      route: "/quiz"
    },
    {
      title: "Avatar Lab",
      description: "Customize your virtual scientist",
      icon: "🧬",
      route: "/avatar"
    },
    {
      title: "Leaderboard",
      description: "See where you stand!",
      icon: "🏁",
      route: "/leaderboard"
    },
    {
      title: "More Games",
      description: "Explore other health challenges",
      icon: "🎲",
      route: "/more-games"
    },
    {
      title: "Find Clinic",
      description: "Locate vaccination centers near you",
      icon: "🏥",
      route: "/map"
    },
    {
      title: "Information Centre",
      description: "Read more or Ask VacciWiz!",
      icon: "🧙‍♂️",
      route: "/info"
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initAnimations();
  }

  initAnimations() {
    gsap.from('.game-title', {
      duration: 1.5,
      opacity: 0,
      y: -50,
      ease: 'power3.out',
    });

    gsap.from('.game-stats', {
      duration: 1,
      opacity: 0,
      y: 20,
      stagger: 0.2,
      delay: 0.5
    });
  }

  get currentSlide() {
    return this.menuItems[this.currentIndex];
  }

  next() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = (this.currentIndex + 1) % this.menuItems.length;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

  prev() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex = (this.currentIndex - 1 + this.menuItems.length) % this.menuItems.length;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

  goToSlide(index: number) {
    if (!this.isAnimating && index !== this.currentIndex) {
      this.isAnimating = true;
      this.currentIndex = index;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

  navigateTo(route: string) {
    if (route === '/quiz') {
      this.showPreloader = true;
  
      setTimeout(() => {
        this.router.navigate([route]).then(() => {
          this.showPreloader = false;
        }).catch((error) => {
          console.error('Navigation error:', error);
          this.showPreloader = false;
        });
      }, 1500);
    } else {
      // For other routes, navigate directly without preloader
      this.router.navigate([route]);
    }
  }
}
