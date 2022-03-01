import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    
  ) {}

  ngOnInit(): void {}

  navbarOpen = false;

}
