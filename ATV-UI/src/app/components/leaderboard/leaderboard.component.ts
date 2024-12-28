import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: { username: string; score: number }[] = [];
  errorMessage: string = '';

  constructor(private leaderboardService: LeaderboardService, private router: Router) { }

  ngOnInit(): void {
    this.fetchLeaderboardData();
  }

  fetchLeaderboardData(): void {
    console.log("inside get top scores");
    this.leaderboardService.getTopScores().subscribe(
      (data: { username: string; score: number; }[]) => {
        this.leaderboardData = data;
      },
      (error: any) => {
        this.errorMessage = 'Failed to load leaderboard data.';
        console.error('Error fetching leaderboard data:', error);
      }
    );
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


}
