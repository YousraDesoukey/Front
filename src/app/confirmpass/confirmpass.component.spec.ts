import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpassComponent } from './confirmpass.component';

describe('ConfirmpassComponent', () => {
  let component: ConfirmpassComponent;
  let fixture: ComponentFixture<ConfirmpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
