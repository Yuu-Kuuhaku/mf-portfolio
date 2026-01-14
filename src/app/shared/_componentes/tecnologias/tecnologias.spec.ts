import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tecnologias } from './tecnologias';

describe('Tecnologias', () => {
  let component: Tecnologias;
  let fixture: ComponentFixture<Tecnologias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tecnologias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tecnologias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
