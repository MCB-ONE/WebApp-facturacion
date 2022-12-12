import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaSummaryComponent } from './factura-summary.component';

describe('FacturaSummaryComponent', () => {
  let component: FacturaSummaryComponent;
  let fixture: ComponentFixture<FacturaSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
