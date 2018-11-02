import { TestBed, inject } from '@angular/core/testing';

import { SpotifyService } from './angular-spotify.service';

describe('AngularSpotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyService]
    });
  });

  it('should be created', inject([SpotifyService], (service: SpotifyService) => {
    expect(service).toBeTruthy();
  }));
});
