import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroCuentaComponent } from './registro-cuenta.component';

describe('RegistroCuentaComponent', () => {
  let component: RegistroCuentaComponent;
  let fixture: ComponentFixture<RegistroCuentaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
