import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaseDetailsComponent } from './edit-case-details.component';

describe('EditCaseDetailsComponent', () => {
  let component: EditCaseDetailsComponent;
  let fixture: ComponentFixture<EditCaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
