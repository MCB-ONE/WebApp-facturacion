import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaFacturaFormComponent } from './linea-factura-form.component';

describe('LineaFacturaFormComponent', () => {
  let component: LineaFacturaFormComponent;
  let fixture: ComponentFixture<LineaFacturaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaFacturaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaFacturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
