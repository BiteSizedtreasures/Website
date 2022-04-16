import { Component, Inject, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT)  document: Document,
  ) {}

  ngOnInit(): void {}

  toggle = false;
  status = 'Enable';

  enableDisableRule() {
    this.toggle = !this.toggle;
    if(this.toggle) {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

}
