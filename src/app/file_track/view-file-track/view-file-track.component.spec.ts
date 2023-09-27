import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFileTrackComponent } from './view-file-track.component';

describe('ViewFileTrackComponent', () => {
  let component: ViewFileTrackComponent;
  let fixture: ComponentFixture<ViewFileTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFileTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFileTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
