import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusBreakerGameComponent } from './virus-breaker-game.component';

describe('VirusBreakerGameComponent', () => {
  let component: VirusBreakerGameComponent;
  let fixture: ComponentFixture<VirusBreakerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirusBreakerGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirusBreakerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
