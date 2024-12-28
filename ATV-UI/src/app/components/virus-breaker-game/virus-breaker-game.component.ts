import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-virus-breaker-game',
  templateUrl: './virus-breaker-game.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './virus-breaker-game.component.css',
})

export class VirusBreakerGameComponent implements OnInit {

  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  private ctx!: CanvasRenderingContext2D | null;
  private ball = { x: 200, y: 300, dx: 2, dy: -2, radius: 15 };
  private paddle = { x: 175, width: 150, height: 15, dx: 7 };
  private pathogens: any[] = [];
  private rows = 3;
  private cols = 7;
  private pathogenWidth = 75;
  private pathogenHeight = 75;
  private pathogenPadding = 20;
  private score = 0;
  private rightPressed = false;
  private leftPressed = false;
  isModalVisible: boolean = false;
  initialModalVisible: boolean = true;
  alertMessage: string = '';
  public isGameOver = false;

  public enableCarouselButtons = true;

  private pathogenImages: HTMLImageElement[] = [];

  constructor(private router: Router) {
    this.loadPathogenImages();
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

  loadPathogenImages(): void {
    const imagePaths = [
      'assets/images/pathogen-images/virus.png',
      'assets/images/pathogen-images/bacteria1.png',
      'assets/images/pathogen-images/bacteria2.png'
    ];

    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
      this.pathogenImages.push(img);
    });
  }

  ngOnInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d');
    this.initializePathogens();
  }

  startGame() {
    this.initialModalVisible = false;
    this.gameLoop();
  }

  initializePathogens(): void {
    for (let i = 0; i < this.rows; i++) {
      this.pathogens[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.pathogens[i][j] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  gameLoop(): void {
    if (!this.isGameOver) {
      this.draw();
      this.moveBall();
      this.detectCollisions();
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  draw(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
    this.drawPathogens();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
  }

  drawPathogens(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const pathogen = this.pathogens[i][j];
        if (pathogen.status === 1) {
          const x = j * (this.pathogenWidth + this.pathogenPadding) + this.pathogenPadding;
          const y = i * (this.pathogenHeight + this.pathogenPadding) + this.pathogenPadding;

          const imageIndex = (i * this.cols + j) % this.pathogenImages.length;
          this.ctx!.drawImage(this.pathogenImages[imageIndex], x, y, this.pathogenWidth, this.pathogenHeight);
        }
      }
    }
  }

  drawBall(): void {
    this.ctx!.beginPath();
    this.ctx!.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx!.fillStyle = '#FFDE21';
    this.ctx!.fill();
    this.ctx!.closePath();
  }

  drawPaddle(): void {
    this.ctx!.fillStyle = '#2196F3';
    this.ctx!.fillRect(this.paddle.x, this.gameCanvas.nativeElement.height - this.paddle.height - 10, this.paddle.width, this.paddle.height);
  }

  drawScore(): void {
    this.ctx!.font = '16px Arial';
    this.ctx!.fillStyle = '#000';
    this.ctx!.fillText(`Score: ${this.score}`, 8, 20);
  }

  moveBall(): void {
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    if (this.ball.x + this.ball.radius > this.gameCanvas.nativeElement.width || this.ball.x - this.ball.radius < 0) {
      this.ball.dx *= -1;
    }
    if (this.ball.y - this.ball.radius < 0) {
      this.ball.dy *= -1;
    } else if (this.ball.y + this.ball.radius > this.gameCanvas.nativeElement.height - this.paddle.height - 10 &&
      this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
      this.ball.dy *= -1;
    }

    if (this.ball.y + this.ball.radius > this.gameCanvas.nativeElement.height) {
      console.log("inside detect collision")
      this.showAlert('Sorry, you could not kill all the Virus!');
    }

    if (this.rightPressed && this.paddle.x < this.gameCanvas.nativeElement.width - this.paddle.width) {
      this.paddle.x += this.paddle.dx;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= this.paddle.dx;
    }
  }

  detectCollisions(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const pathogen = this.pathogens[i][j];
        if (pathogen.status === 1) {
          const pathogenX = j * (this.pathogenWidth + this.pathogenPadding) + this.pathogenPadding;
          const pathogenY = i * (this.pathogenHeight + this.pathogenPadding) + this.pathogenPadding;
          if (
            this.ball.x > pathogenX &&
            this.ball.x < pathogenX + this.pathogenWidth &&
            this.ball.y > pathogenY &&
            this.ball.y < pathogenY + this.pathogenHeight
          ) {
            pathogen.status = 0;
            this.ball.dy = -this.ball.dy;
            this.score++;
          }
          if (this.score === this.rows * this.cols) {
            pathogen.status = 0;
            this.ball.dy = -this.ball.dy;
            this.score++;
            this.showAlert('Congratulations! You win!');
            this.isGameOver = true;
          }
        }
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  showAlert(message: string): void {
    this.alertMessage = message;
    this.isModalVisible = true;
  }

  playAgain(): void {
    window.location.reload();
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.router.navigate(['/more-games']);
  }

}
