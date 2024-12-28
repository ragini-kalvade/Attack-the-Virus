import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-virus-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './virus-simulator.component.html',
  styleUrl: './virus-simulator.component.css'
})
export class VirusSimulatorComponent implements OnInit {
  gridSize: number = 9;
  grid: string[][] = [];
  timer: any;
  virusSpreadInterval: number = 10000;
  currentProblem: string = '';
  currentAnswer: number = 0;
  score: number = 0;
  isGameOver: boolean = false;
  initialModalVisible: boolean = true;
  isModalVisible: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeGrid();
    this.generateMathProblem();
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

  startGame() {
    this.startVirusSpread();
    this.initialModalVisible = false;
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => 'healthy')
    );
    this.infectRandomCell();
  }

  infectRandomCell(): void {
    const healthyCells = this.getHealthyCells();
    if (healthyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * healthyCells.length);
      const [x, y] = healthyCells[randomIndex];
      this.grid[x][y] = 'infected';
    } else {
      this.endGame();
    }
  }

  getHealthyCells(): [number, number][] {
    const cells: [number, number][] = [];
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        if (this.grid[x][y] === 'healthy') {
          cells.push([x, y]);
        }
      }
    }
    return cells;
  }

  generateMathProblem(): void {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const num3 = Math.floor(Math.random() * 20) + 1;
    const num4 = Math.floor(Math.random() * 20) + 1;

    const operators = ['+', '-', '*'];
    const operator1 = operators[Math.floor(Math.random() * operators.length)];
    const operator2 = operators[Math.floor(Math.random() * operators.length)];

    const expression = `(${num1} ${operator1} ${num2}) ${operator2} (${num3} ${operator1} ${num4})`;

    this.currentProblem = expression;
    this.currentAnswer = this.evaluateExpression(expression);
  }

  evaluateExpression(expression: string): number {
    try {
      return eval(expression);
    } catch (error) {
      console.error('Error evaluating expression:', error);
      return NaN;
    }
  }

  checkAnswer(playerAnswer: string): void {
    if (parseInt(playerAnswer) === this.currentAnswer) {
      this.score++;
      this.healRandomCell();
      this.generateMathProblem();
    } else {
      this.score = Math.max(0, this.score - 1);
    }
  }

  healRandomCell(): void {
    const infectedCells = this.getInfectedCells();
    if (infectedCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * infectedCells.length);
      const [x, y] = infectedCells[randomIndex];
      this.grid[x][y] = 'healthy';
    }
  }

  getInfectedCells(): [number, number][] {
    const cells: [number, number][] = [];
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        if (this.grid[x][y] === 'infected') {
          cells.push([x, y]);
        }
      }
    }
    return cells;
  }

  startVirusSpread(): void {
    this.timer = setInterval(() => {
      this.infectRandomCell();
    }, this.virusSpreadInterval);
  }

  endGame(): void {
    clearInterval(this.timer);
    this.isGameOver = true;
    this.isModalVisible = true;
  }

  resetGame(): void {
    this.isGameOver = false;
    this.score = 0;
    this.initializeGrid();
    this.generateMathProblem();
    this.startVirusSpread();
  }

  closeModal() {
    this.initialModalVisible = false;
    this.router.navigate(['/more-games']);
  }

  playAgain(): void {
    window.location.reload();
  }
}
