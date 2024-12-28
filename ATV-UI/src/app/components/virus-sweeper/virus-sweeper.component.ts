import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScoringComponent } from '../scoring/scoring.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  adjacentMines: number;
}

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-virus-sweeper',
  standalone: true,
  imports: [ScoringComponent, CommonModule],
  templateUrl: './virus-sweeper.component.html',
  styleUrl: './virus-sweeper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VirusSweeperComponent implements OnInit {

  grid: Cell[][] = [];
  rows: number = 15;
  cols: number = 10;
  mineCount: number = 20;
  revealedCells: number = 0;
  timeElapsed: number = 0;
  timer: any;
  isModalVisible: boolean = false;
  alertMessage = '';
  initialModalVisible: boolean = true;

  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startGame() {
    this.initialModalVisible = false;
    this.initializeGame();
  }

  initializeGame(): void {
    this.revealedCells = 0;
    this.timeElapsed = 0;
    this.startTimer();
    this.initializeGrid();
    this.placeMines();
    this.calculateAdjacentMines();
  }

  startTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({
        isMine: false,
        isRevealed: false,
        adjacentMines: 0
      }))
    );
  }

  placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.mineCount) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.grid[row][col].isMine) {
        this.grid[row][col].isMine = true;
        minesPlaced++;
      }
    }
  }

  calculateAdjacentMines(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (!this.grid[row][col].isMine) {
          this.grid[row][col].adjacentMines = this.getAdjacentCells(row, col).filter(
            (cell) => cell.isMine
          ).length;
        }
      }
    }
  }

  getAdjacentCells(row: number, col: number): Cell[] {
    const cells = [];
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && !(r === row && c === col)) {
          cells.push(this.grid[r][c]);
        }
      }
    }
    return cells;
  }

  revealCell(row: number, col: number): void {
    const cell = this.grid[row][col];
    if (cell.isRevealed) return;
    cell.isRevealed = true;
    this.revealedCells++;

    if (cell.isMine) {
      // alert('Game Over! Final Score: ' + this.calculateScore());
      this.revealAllCells();
      this.showAlert('Game Over! Total cells revealed: ' + this.revealedCells);
      clearInterval(this.timer);
    } else if (cell.adjacentMines === 0) {
      this.getAdjacentCells(row, col).forEach((adjCell, index) => {
        const adjRow = row + (index < 3 ? -1 : index > 5 ? 1 : 0);
        const adjCol = col + ((index % 3) - 1);
        if (adjRow >= 0 && adjRow < this.rows && adjCol >= 0 && adjCol < this.cols) {
          this.revealCell(adjRow, adjCol);
        }
      });
    }

    if (this.revealedCells === this.rows * this.cols - this.mineCount) {
      alert('You Win! Final Score: ' + this.calculateScore());
      clearInterval(this.timer);
    }
  }

  revealAllCells(): void {
    this.grid.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)));
  }

  calculateScore(): number {
    return this.revealedCells * 10 - this.timeElapsed;
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

  showAlert(message: string): void {
    this.alertMessage = message;
    this.isModalVisible = true;
  }

  playAgain(): void {
    window.location.reload();
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.initialModalVisible = false;
    this.router.navigate(['/more-games']);
  }

}
