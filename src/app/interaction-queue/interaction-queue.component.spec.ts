import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionQueueComponent } from './interaction-queue.component';

describe('InteractionQueueComponent', () => {
  let component: InteractionQueueComponent;
  let fixture: ComponentFixture<InteractionQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractionQueueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractionQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
