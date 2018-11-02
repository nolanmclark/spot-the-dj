import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { SpotifyService } from '../angular-spotify.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  duration: any;
  player: any = null;
  connected: boolean;
  ready: boolean;
  playing: boolean;
  progressValue: any;
  currentSong: string;
  currentArtist: string;
  albumImageUrl: string;

  constructor(public spotifyApi: LoginService, public spotifyService: SpotifyService, public playerService: PlayerService) { 

  }

  ngOnInit() {
    this.startPlayer();
    this.getCurrent();
  }

  startPlayer() {
    this.playerService.initPlayer();
    this.progressValue = 0;
    this.playerService.isReady.subscribe(res => this.ready = res);
    this.playerService.getProgress.subscribe(progress => this.progressValue = progress);
  }

  startedSong() {
    this.playerService.currentState.subscribe(player => {
      this.player = player;
      if(player.position === 0) {
        console.log("animating");
        this.playerService.animateValue(0, 100, player.duration);
      }
      this.duration = player.duration;
      this.connected = true;
      this.playing = true;
      this.albumImageUrl = this.player.track_window.current_track.album.images[0].url;
      this.currentSong = this.player.track_window.current_track.name;
      this.currentArtist = this.player.track_window.current_track.artists[0].name;
    });
    
    this.progressValue = 0;
  }

  progress(current) {
    
  }

  playSong() {
    let uri = this.player.track_window.next_tracks[0].uri;
    this.spotifyApi.playSong(uri).subscribe(data => {
      console.log(data);
    });
  }

  getCurrent(){
    this.spotifyApi.getUserPlaying().subscribe(data => {
      console.log(data);
    });
  }

  // nextSong() {
  //   // let nextSongURI = this.player.track_window.next_tracks[0].uri;
  //   this.playerService.nextSong("spotify:track:4YZbVct8l9MnAVIROnLQdx");
  // }
}
