import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJurisdictionComponent } from './list-jurisdiction.component';

describe('ListJurisdictionComponent', () => {
  let component: ListJurisdictionComponent;
  let fixture: ComponentFixture<ListJurisdictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJurisdictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJurisdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
