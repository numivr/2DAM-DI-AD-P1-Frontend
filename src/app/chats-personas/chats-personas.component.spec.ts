import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatsPersonasComponent } from './chats-personas.component';

describe('ChatsPersonasComponent', () => {
  let component: ChatsPersonasComponent;
  let fixture: ComponentFixture<ChatsPersonasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChatsPersonasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
