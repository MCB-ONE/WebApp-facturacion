import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasFacturaTableComponent } from './lineas-factura-table.component';

describe('LineasFacturaTableComponent', () => {
  let component: LineasFacturaTableComponent;
  let fixture: ComponentFixture<LineasFacturaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineasFacturaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineasFacturaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
