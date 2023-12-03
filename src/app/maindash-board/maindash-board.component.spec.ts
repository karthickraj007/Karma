import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindashBoardComponent } from './maindash-board.component';

describe('MaindashBoardComponent', () => {
  let component: MaindashBoardComponent;
  let fixture: ComponentFixture<MaindashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaindashBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaindashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
