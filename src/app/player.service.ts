import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {SPOTIFY_CONFIG } from './app.spotify.config';

declare var Spotify;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private sdkToken = SPOTIFY_CONFIG.sdkKey;
  private state = new BehaviorSubject<any>({});
  public currentState = this.state.asObservable();
  private ready = new BehaviorSubject<any>(false);
  public isReady = this.ready.asObservable();
  private currentProgress = new BehaviorSubject<any>(false);
  public getProgress = this.currentProgress.asObservable();

  public player: any;

  constructor() {
  }

  initPlayer() {
    if (window) {
        const url = 'https://sdk.scdn.co/spotify-player.js';
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    }
    (<any>window).onSpotifyWebPlaybackSDKReady = () => {
      const token = this.sdkToken;
      const player = new Spotify.Player({
        name: 'SpotTheDJ',
        getOAuthToken: cb => { cb(token); }
      });
      this.player = player;
    
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Playback status updates
      player.addListener('player_state_changed', (state) => { 
        this.state.next(state);
        console.log(state);
      });
    
      // Ready
      player.addListener('ready', ({ device_id }) => {
        this.ready.next(true);
        console.log('Ready with Device ID', device_id);
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      player.connect();
    };
   }

  animateValue(start, end, duration) {
    clearInterval(timer);
    let parent = this;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(() => {
        current += increment;
        this.currentProgress.next(current);
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
  }

  setProgress(int) {
    this.currentProgress.next(int);
  }

   getPlayer() {
     return this.currentState;
   }
}
