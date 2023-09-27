import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileTrackComponent } from './add-file-track.component';

describe('AddFileTrackComponent', () => {
  let component: AddFileTrackComponent;
  let fixture: ComponentFixture<AddFileTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFileTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
