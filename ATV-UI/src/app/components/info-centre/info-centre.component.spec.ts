import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCentreComponent } from './info-centre.component';

describe('InfoCentreComponent', () => {
  let component: InfoCentreComponent;
  let fixture: ComponentFixture<InfoCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCentreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
