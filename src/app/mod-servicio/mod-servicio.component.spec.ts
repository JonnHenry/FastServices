import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModServicioComponent } from './mod-servicio.component';

describe('ModServicioComponent', () => {
  let component: ModServicioComponent;
  let fixture: ComponentFixture<ModServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
