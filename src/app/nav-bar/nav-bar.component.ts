import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() authenticated: boolean;
  user: any;

  constructor(public spotifyAPI: LoginService) { 

  }

  ngOnInit() {
    if(localStorage.getItem('spotify-token') === null) {
      this.authenticated = false;
    } else {
      this.getUserData();
      this.authenticated = true;
    }
  }

  login() {
    this.spotifyAPI.login().subscribe(
        token => {
            this.getUserData();
        },
        err => console.error(err),
        () => { });
  }

  getUserData() {
    this.spotifyAPI.getCurrentUser()
    .subscribe( data => { 
      console.log("getCurrentUser: ", data); 
      this.user = data;
      this.authenticated = true;
    },
    err=> console.error(err));
  }

  logout() {
    localStorage.removeItem('spotify-token');
    this.authenticated = false;
  }
}
