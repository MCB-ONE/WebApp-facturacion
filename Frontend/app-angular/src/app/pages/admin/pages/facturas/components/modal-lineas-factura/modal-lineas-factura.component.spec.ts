import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLineasFacturaComponent } from './modal-lineas-factura.component';

describe('ModalLineasFacturaComponent', () => {
  let component: ModalLineasFacturaComponent;
  let fixture: ComponentFixture<ModalLineasFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLineasFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLineasFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
