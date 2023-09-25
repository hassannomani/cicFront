import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseDetailsComponent } from './add-case-details.component';

describe('AddCaseDetailsComponent', () => {
  let component: AddCaseDetailsComponent;
  let fixture: ComponentFixture<AddCaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
