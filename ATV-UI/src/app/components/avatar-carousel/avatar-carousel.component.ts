import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap, Sine } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { AvatarService } from './avatar.service';
import { PreloaderComponent } from "../preloader/preloader.component";


gsap.registerPlugin(CSSPlugin);

enum Direction {
  Left = '-=',
  Right = '+='
}

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-avatar-carousel',
  standalone: true,
  imports: [CommonModule, PreloaderComponent],
  templateUrl: './avatar-carousel.component.html',
  styleUrls: ['./avatar-carousel.component.css']
})
export class AvatarCarouselComponent implements AfterViewInit {
  public currentAvatarIndex = 1;
  public hasSelectedAvatar = false;
  public enableCarouselButtons = true;

  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;


  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' }
  ];

  showPreloader = false;

  constructor(
    private router: Router,
    private avatarService: AvatarService
  ) {
    // Subscribe to the hasSelectedAvatar observable
    this.avatarService.hasSelectedAvatar$.subscribe(
      hasSelected => this.hasSelectedAvatar = hasSelected
    );
  }

  onNavHover(element: HTMLElement | EventTarget | null): void {
    if (element instanceof HTMLElement) {
      gsap.to(element, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  onNavLeave(element: HTMLElement | EventTarget | null): void {
    if (element instanceof HTMLElement) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  onNavClick(route: string): void {
    this.router.navigate([route]);
  }

  selectCurrentAvatar(): void {
    this.avatarService.setSelectedAvatar(this.currentAvatarIndex);
  }

  changeAvatar(): void {
    this.avatarService.clearSelection();
  }

  private readonly inactiveProperties = {
    filter: 'grayscale(100%)',
    scale: 0.5,
    opacity: 0.3
  }

  @ViewChildren('carouselItem')
  private carouselItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const carouselNativeElements = this.getCarouselElements();
    const currentLeftAvatar = carouselNativeElements[0];
    const currentRightAvatar = carouselNativeElements[2];
    gsap.set([currentLeftAvatar, currentRightAvatar], this.inactiveProperties);
  }

  public right(): void {
    this.slide(Direction.Right);
  }

  public left(): void {
    this.slide(Direction.Left); // Fixed: Changed from Direction.Right to Direction.Left
  }

  private slide(direction: Direction): void {
    this.enableCarouselButtons = false;

    const carouselNativeElements = this.getCarouselElements();
    const currentLeftAvatarIndex = this.getPreviousIndex(this.currentAvatarIndex);
    const currentRightAvatarIndex = this.getNextIndex(this.currentAvatarIndex);

    const currentLeftAvatar = carouselNativeElements[currentLeftAvatarIndex];
    const currentCentralAvatar = carouselNativeElements[this.currentAvatarIndex];
    const currentRightAvatar = carouselNativeElements[currentRightAvatarIndex];

    let moveAcrossBackAvatar;
    let moveAcrossBackDirection;
    let moveToSideDirection;
    let moveToCenterAvatar;
    let moveToCenterDirection;
    const moveToSideAvatar = currentCentralAvatar;

    let nextAvatarIndex;

    if (direction === Direction.Right) {
      moveAcrossBackAvatar = currentLeftAvatar;
      moveAcrossBackDirection = Direction.Right;
      moveToSideDirection = Direction.Left;
      moveToCenterAvatar = currentRightAvatar;
      moveToCenterDirection = Direction.Left;
      nextAvatarIndex = currentRightAvatarIndex;
    } else {
      moveAcrossBackAvatar = currentRightAvatar;
      moveAcrossBackDirection = Direction.Left;
      moveToSideDirection = Direction.Right;
      moveToCenterAvatar = currentLeftAvatar;
      moveToCenterDirection = Direction.Right;
      nextAvatarIndex = currentLeftAvatarIndex;
    }

    gsap.timeline({ repeat: 0})
      .to([moveToSideAvatar], {
        ...this.inactiveProperties,
        duration: 1,
        ease: Sine.easeInOut,
        x: moveToSideDirection + '100%'
      }).to([moveAcrossBackAvatar], {
        ...this.inactiveProperties,
        delay: -1,
        duration: 1,
        ease: Sine.easeInOut,
        x: moveAcrossBackDirection + '200%'
      }).to([moveToCenterAvatar], {
        filter: 'none',
        scale: 1.0,
        opacity: 1.0,
        delay: -1,
        duration: 1,
        ease: Sine.easeInOut,
        x: moveToCenterDirection + '100%'
      }).eventCallback('onComplete', () => {
        this.enableCarouselButtons = true;
        this.currentAvatarIndex = nextAvatarIndex;
      });
  }

  private getNextIndex(index: number): number {
    return ((index + 1) % this.carouselItems.length);
  }

  private getPreviousIndex(index: number): number {
    return ((index + this.carouselItems.length - 1)
      % this.carouselItems.length);
  }

  private getCarouselElements(): any[] {
    return this.carouselItems.toArray().map(el => el.nativeElement)
  }

  startQuiz() {
    this.showPreloader = true;
    setTimeout(() => {
      this.router.navigate(['/quiz']);
      this.showPreloader = false;
    }, 2000); 
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
