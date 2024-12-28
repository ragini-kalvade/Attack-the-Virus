import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-more-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-games.component.html',
  styleUrl: './more-games.component.css'
})

export class MoreGamesComponent {

  constructor(private router: Router) {

  }

  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' }
  ];

  onNavHover(element: HTMLElement) {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavLeave(element: HTMLElement) {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavClick(route: string): void {
    this.router.navigate([route]);
  }

  navigateToVirusBreaker() {
    this.router.navigate(['/virus-breaker'])
  }

  navigateToVirusSweeper() {
    this.router.navigate(['/virus-sweeper'])
  }

  navigateToVirusSimulator() {
    this.router.navigate(['/virus-simulator'])
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
