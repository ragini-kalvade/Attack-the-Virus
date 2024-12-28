import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardSlideshowComponent } from './info-card-slideshow.component';

describe('InfoCardSlideshowComponent', () => {
  let component: InfoCardSlideshowComponent;
  let fixture: ComponentFixture<InfoCardSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardSlideshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCardSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
