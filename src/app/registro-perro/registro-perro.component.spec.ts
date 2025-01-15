import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroPerroComponent } from './registro-perro.component';

describe('RegistroPerroComponent', () => {
  let component: RegistroPerroComponent;
  let fixture: ComponentFixture<RegistroPerroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroPerroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
