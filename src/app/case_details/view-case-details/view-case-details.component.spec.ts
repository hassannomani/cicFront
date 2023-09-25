import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCaseDetailsComponent } from './view-case-details.component';

describe('ViewCaseDetailsComponent', () => {
  let component: ViewCaseDetailsComponent;
  let fixture: ComponentFixture<ViewCaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
