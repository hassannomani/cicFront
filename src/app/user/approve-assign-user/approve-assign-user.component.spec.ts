import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAssignUserComponent } from './approve-assign-user.component';

describe('ApproveAssignUserComponent', () => {
  let component: ApproveAssignUserComponent;
  let fixture: ComponentFixture<ApproveAssignUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAssignUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveAssignUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
