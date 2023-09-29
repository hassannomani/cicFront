import { TestBed } from '@angular/core/testing';

import { FileTrackService } from './file-track.service';

describe('FileTrackService', () => {
  let service: FileTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
