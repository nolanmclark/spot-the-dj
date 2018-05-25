import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { SPOTIFY_CONFIG } from './app.spotify.config';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string;
  private client_id = SPOTIFY_CONFIG.clientId;
  private client_secret = SPOTIFY_CONFIG.clientSecret;

  private accessToken: any;
  private tokenType: string;

  constructor(private http: HttpClient ) { 

  }

  login() {
      let authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
      const httpOptions = {
        headers: new HttpHeaders().set('Authorization', 'Basic  ' + btoa(this.client_id + ':' + this.client_secret)).set('Content-Type', 'application/x-www-form-urlencoded')
      }
      let body = 'grant_type=client_credentials';
      this.http.post(authorizationTokenUrl, body, httpOptions).pipe(map((data: Http) => {
        this.accessToken = data['access_token'];
        console.log(data);
      })).subscribe((res) => {

      })
  }

  getFeatured() {
    let url = "https://api.spotify.com/v1/browse/featured-playlists";
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    }
    console.log("HERE");
    return this.http.get(url, httpOptions);
  }
}
