import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  @Input() image: any;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
    this.image = this.image.url;
  }

}
