import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLeaderComponent } from './list-leader.component';

describe('ListLeaderComponent', () => {
  let component: ListLeaderComponent;
  let fixture: ComponentFixture<ListLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
