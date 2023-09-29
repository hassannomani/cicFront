import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileTracksComponent } from './list-file-tracks.component';

describe('ListFileTracksComponent', () => {
  let component: ListFileTracksComponent;
  let fixture: ComponentFixture<ListFileTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFileTracksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFileTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
