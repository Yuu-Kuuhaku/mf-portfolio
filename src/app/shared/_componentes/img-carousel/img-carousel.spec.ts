import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCarousel } from './img-carousel';

describe('ImgCarousel', () => {
  let component: ImgCarousel;
  let fixture: ComponentFixture<ImgCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
