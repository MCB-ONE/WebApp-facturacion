import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasTableComponent } from './empresas-table.component';

describe('EmpresasTableComponent', () => {
  let component: EmpresasTableComponent;
  let fixture: ComponentFixture<EmpresasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
