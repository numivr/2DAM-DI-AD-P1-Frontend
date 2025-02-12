import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponenteComentarioComponent } from './componente-comentario.component';

describe('ComponenteComentarioComponent', () => {
  let component: ComponenteComentarioComponent;
  let fixture: ComponentFixture<ComponenteComentarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ComponenteComentarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
