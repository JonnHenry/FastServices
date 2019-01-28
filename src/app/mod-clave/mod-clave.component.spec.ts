import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModClaveComponent } from './mod-clave.component';

describe('ModClaveComponent', () => {
  let component: ModClaveComponent;
  let fixture: ComponentFixture<ModClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
