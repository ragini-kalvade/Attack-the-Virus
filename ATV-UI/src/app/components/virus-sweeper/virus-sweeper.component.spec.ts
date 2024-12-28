import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusSweeperComponent } from './virus-sweeper.component';

describe('VirusSweeperComponent', () => {
  let component: VirusSweeperComponent;
  let fixture: ComponentFixture<VirusSweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirusSweeperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirusSweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
