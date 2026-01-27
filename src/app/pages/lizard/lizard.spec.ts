import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lizard } from './lizard';

describe('Lizard', () => {
  let component: Lizard;
  let fixture: ComponentFixture<Lizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
