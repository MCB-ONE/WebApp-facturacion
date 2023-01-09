import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveEmpresaHeaderComponent } from './active-empresa-header.component';

describe('ActiveEmpresaHeaderComponent', () => {
  let component: ActiveEmpresaHeaderComponent;
  let fixture: ComponentFixture<ActiveEmpresaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveEmpresaHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveEmpresaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
