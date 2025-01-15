import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroCualidadesComponent } from './registro-cualidades.component';

describe('RegistroCualidadesComponent', () => {
  let component: RegistroCualidadesComponent;
  let fixture: ComponentFixture<RegistroCualidadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroCualidadesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCualidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
