import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorComponent } from './jugador.component';

describe('JugadorComponent', () => {
  let component: JugadorComponent;
  let fixture: ComponentFixture<JugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
