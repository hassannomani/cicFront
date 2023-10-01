import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileTrackComponent } from './edit-file-track.component';

describe('EditFileTrackComponent', () => {
  let component: EditFileTrackComponent;
  let fixture: ComponentFixture<EditFileTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFileTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFileTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
