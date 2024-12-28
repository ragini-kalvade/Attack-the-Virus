import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusSimulatorComponent } from './virus-simulator.component';

describe('VirusSimulatorComponent', () => {
  let component: VirusSimulatorComponent;
  let fixture: ComponentFixture<VirusSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirusSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirusSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
