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

  constructor(public spotifyAPI: LoginService, public playerService: PlayerService) {
    if (localStorage.getItem("spotify-token") === null) {
      this.spotifyAPI.login();
    } else {
      this.spotifyAPI.accessToken = localStorage.getItem("spotify-token");
    }
  }
}
