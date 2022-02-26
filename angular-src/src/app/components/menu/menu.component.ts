import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Title } from '@angular/platform-browser';
import {FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  name: String;
  allergins: String;
  ingredients: String;
  price: Number;
  coating: String;
  decoration: String;

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private title: Title,
    private authService: AuthService,
    private validateService: ValidateService
  ) { 
    this.title.setTitle('Menu');
  }

  ngOnInit(): void {
  }

  OnItemSubmit() {
    const item = {
      name: this.name,
      allergins: this.allergins,
      ingredients: this.ingredients,
      price: this.price,
      coating: this.coating,
      decoration: this.decoration,
    }

    // Required fields
    if(!this.validateService.validateMenu(item)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Add Item to database
    this.authService.addItem(item).subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Item was added successfully.',{cssClass: 'alert-success', timeout:3000});
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'alert-danger', timeout:3000});
      }
    });
  }
}
