import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nowPlaying: any = [];
  message: string;

  constructor(public spotifyAPI: LoginService) { 
    setTimeout(() => {
      this.getPlaylists();
    }, 1000);
  }

  ngOnInit() {
    
  }

  getPlaylists() {
    this.spotifyAPI.getFeatured().subscribe((res: any) => {
      this.nowPlaying= res.playlists.items;
      this.message = res.message;
      console.log(res)
    });
  }
}
