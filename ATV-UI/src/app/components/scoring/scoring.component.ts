import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoring',
  standalone: true,
  imports: [],
  templateUrl: './scoring.component.html',
  styleUrl: './scoring.component.css'
})
export class ScoringComponent {
  @Input() revealedCells: number = 0;
  @Input() totalMines: number = 0;
  @Input() timeElapsed: number = 0;
}
