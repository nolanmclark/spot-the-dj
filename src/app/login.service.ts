import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { SPOTIFY_CONFIG } from './app.spotify.config';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string;
  private client_id = SPOTIFY_CONFIG.clientId;
  private client_secret = SPOTIFY_CONFIG.clientSecret;

  accessToken: any;
  private tokenType: string;
  private apiBase = "https://api.spotify.com/v1/";

  constructor(private http: HttpClient) { 

  }

  //#region login
  login() {
    var promise = new Promise((resolve, reject) => {
      var w = 400,
        h = 500,
        left = (screen.width / 2) - (w / 2),
        top = (screen.height / 2) - (h / 2);

      var params = {
        client_id: this.client_id,
        redirect_uri: 'http://localhost:4200/login',
        response_type: 'token',
        scope: ['user-follow-modify', 'user-follow-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public', 'playlist-modify-private', 'user-library-read', 'user-library-modify', 'user-read-private', 'user-read-playback-state','user-modify-playback-state', 'user-read-currently-playing']
      };
      var authCompleted = false;
      var authWindow = this.openDialog(
        'https://accounts.spotify.com/authorize?' + this.toQueryString(params),
        'Spotify',
        'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left,
        () => {
          if (!authCompleted) {
            return reject('Login rejected error');
          }
        }
      );

      var storageChanged = (e) => {
        if (e.key === 'spotify-token') {
          if (authWindow) {
            authWindow.close();
          }
          authCompleted = true;

          this.accessToken = e.newValue;
          localStorage.setItem('accessToken', e.newValue);
          window.removeEventListener('storage', storageChanged, false);

          return resolve(e.newValue);
        }
      };
      window.addEventListener('storage', storageChanged, false);
    });
    return from(promise);
  }

  getFeatured() {
    let url = "https://api.spotify.com/v1/browse/featured-playlists";
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    }
    console.log("HERE");
    return this.http.get(url, httpOptions);
  }

  //#region profiles
  getUser(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    }
    return this.http.get(`${this.apiBase}users/${userId}`, httpOptions);
  }

  getCurrentUser() {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    }
    return this.http.get(`${this.apiBase}me`, httpOptions);
  }

  getUserDevices() {
  const httpOptions = {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
  }
  return this.http.get(`${this.apiBase}me/player/devices`, httpOptions);
}  
  getUserPlaying() {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    }
    return this.http.get(`${this.apiBase}me/player/currently-playing`, httpOptions);
  }  

  playSong(uri) {
    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    }
    const body = {"uris": [uri] };
    return this.http.put(`${this.apiBase}me/player/play`, body, httpOptions)
  }


  //#endregion

  //#region utils
  private toQueryString(obj: Object): string {
    var parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    };
    return parts.join('&');
  };

  private openDialog(uri, name, options, cb) {
    var win = window.open(uri, name, options);
    var interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          cb(win);
        }
      } catch (e) { }
    }, 1000000);
    return win;
  }

  private auth(isJson?: boolean): Object {
    var auth = {
      'Authorization': 'Bearer ' + this.accessToken
    };
    if (isJson) {
      auth['Content-Type'] = 'application/json';
    }
    return auth;
  }

  private getHeaders(isJson?: boolean): any {
    return new Headers(this.auth(isJson));
  }

  private getIdFromUri(uri: string) {
    return uri.indexOf('spotify:') === -1 ? uri : uri.split(':')[2];
  }

  private mountItemList(items: string | Array<string>): Array<string> {
    var itemList = Array.isArray(items) ? items : items.split(',');
    itemList.forEach((value, index) => {
      itemList[index] = this.getIdFromUri(value);
    });
    return itemList;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json()|| 'Server error');
  }

  private api(requestOptions: RequestOptions) {
    let method = requestOptions.method || 'GET';
    let url = this.apiBase + requestOptions.url;
    return this.http.request(new HttpRequest(
      method.toString(),
      url,
      {
      search: this.toQueryString(requestOptions.search),
      body: JSON.stringify(requestOptions.body),
      headers: requestOptions.headers
    }));
  }

  //#endregion
}
