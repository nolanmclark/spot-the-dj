import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    var hash = window.location.hash;
      if (window.location.search.substring(1).indexOf("error") !== -1) {
        // login failure
        window.close();
      } else if (hash) {
        // login success
        var token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('spotify-token', token);
      }
  }

}
