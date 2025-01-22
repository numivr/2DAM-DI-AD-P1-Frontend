import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentePublicacionComponent } from './componente-publicacion.component';

describe('ComponentePublicacionComponent', () => {
  let component: ComponentePublicacionComponent;
  let fixture: ComponentFixture<ComponentePublicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ComponentePublicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentePublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
