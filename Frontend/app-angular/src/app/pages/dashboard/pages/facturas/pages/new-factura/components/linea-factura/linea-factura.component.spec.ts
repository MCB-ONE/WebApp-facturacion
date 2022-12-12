import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaFacturaComponent } from './linea-factura.component';

describe('LineaFacturaComponent', () => {
  let component: LineaFacturaComponent;
  let fixture: ComponentFixture<LineaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
