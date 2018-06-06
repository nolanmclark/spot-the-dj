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

  public player: any;

  constructor() {}

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
        name: 'Web Playback SDK Quick Start Player',
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

   getPlayer() {
     return this.currentState;
   }

   pause() {
     this.player.pause();
   }
}
