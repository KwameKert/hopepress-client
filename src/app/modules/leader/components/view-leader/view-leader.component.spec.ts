import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaderComponent } from './view-leader.component';

describe('ViewLeaderComponent', () => {
  let component: ViewLeaderComponent;
  let fixture: ComponentFixture<ViewLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
