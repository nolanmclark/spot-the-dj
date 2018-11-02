import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  authenticated: boolean = false;

  constructor(public spotifyAPI: LoginService, public playerService: PlayerService) {
    if (localStorage.getItem("spotify-token") === null) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
      this.spotifyAPI.accessToken = localStorage.getItem("spotify-token");
    }
  }
}
