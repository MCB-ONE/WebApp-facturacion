import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFacturaPdfComponent } from './modal-factura-pdf.component';

describe('ModalFacturaPdfComponent', () => {
  let component: ModalFacturaPdfComponent;
  let fixture: ComponentFixture<ModalFacturaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFacturaPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFacturaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
