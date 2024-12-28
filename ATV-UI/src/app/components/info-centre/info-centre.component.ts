import { Component } from '@angular/core';
import { ChatbotComponent } from '../../chatbot/chatbot.component';
import { InfoCardSlideshowComponent } from '../info-card-slideshow/info-card-slideshow.component'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-info-centre',
  standalone: true,
  imports: [CommonModule, ChatbotComponent, InfoCardSlideshowComponent],
  templateUrl: './info-centre.component.html',
  styleUrl: './info-centre.component.css'
})
export class InfoCentreComponent {
  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' }
  ];
  
  constructor(private router: Router) {
  }

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
