import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCaseDetailsComponent } from './list-case-details.component';

describe('ListCaseDetailsComponent', () => {
  let component: ListCaseDetailsComponent;
  let fixture: ComponentFixture<ListCaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
