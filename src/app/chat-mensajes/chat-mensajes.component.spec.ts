import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatMensajesComponent } from './chat-mensajes.component';

describe('ChatMensajesComponent', () => {
  let component: ChatMensajesComponent;
  let fixture: ComponentFixture<ChatMensajesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChatMensajesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
