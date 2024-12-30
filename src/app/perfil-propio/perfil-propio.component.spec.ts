import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfilPropioComponent } from './perfil-propio.component';

describe('PerfilPropioComponent', () => {
  let component: PerfilPropioComponent;
  let fixture: ComponentFixture<PerfilPropioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PerfilPropioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
