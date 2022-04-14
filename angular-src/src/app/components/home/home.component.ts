import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config: any;
  fullpage_api: any;

  constructor(
    private title:Title
  ) {
    this.title.setTitle('BiteSizedTreasures');

    this.config = {
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      menu: '#menu',

      afterResize: () => {
        console.log('afterResize');
      },
      afterLoad: (origin: any, destination: any, direction: any) => {
        console.log(origin.index);
      }
    };
  }
  getReg(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }

  ngOnInit(): void {
  }


}
