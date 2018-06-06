import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

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
  progressValue: any;
  currentSong: string;
  currentArtist: string;
  albumImageUrl: string;

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.connected = false;
    this.ready = false;
    this.progressValue = 0;
  }

  startPlayer() {
    this.playerService.initPlayer();
    console.log("click");
    this.progressValue = 0;
    this.playerService.isReady.subscribe(res => this.ready = res);
    console.log(this.ready);
  }

  startedSong() {
    this.player = this.playerService.currentState.subscribe(player => {
      this.player = player;
      this.duration = player.duration;
      this.connected = true;
      this.albumImageUrl = this.player.track_window.current_track.album.images[0].url;
      this.currentSong = this.player.track_window.current_track.name;
      this.currentArtist = this.player.track_window.current_track.artists[0].name;
    });
    this.animateValue(this.progressValue, 100, this.duration);
  }

  animateValue(this, start, end, duration) {
    let parent = this;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(() => {
        current += increment;
        parent.progressValue = current; 

        console.log(parent.progressValue);   
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
  }

  progress(current) {
    
    
  }
}
