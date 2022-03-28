import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
import {FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  name?: String;
  allergins?: String;
  ingredients?: String;
  price?: Number;
  coating?: String;
  decoration?: String;
  allProducts: any = [];
  id: any = [];

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(this.id);
  }

  fetchProduct(productID: any) {
    const productObservable = this.authService.fetchProductbyID(productID);
    productObservable.subscribe((data: any) => {
      (data = Object.values(data)), (this.allProducts = data[1]);
    });
  }

  updateProductbyID() {
    const item = {
      name: this.name,
      allergins: this.allergins,
      ingredients: this.ingredients,
      price: this.price,
      coating: this.coating,
      decoration: this.decoration,
    };

    const productObservable = this.authService.updateProductbyID(this.id, item);
    productObservable.subscribe((data: any) => {
      if (data.success) {
        this.flashMessage.show('Item was updated successfully.', {
          cssClass:
            'bg-green-100 border-l-4 border-orange-500 text-orange-700 p-4',
          timeout: 3000,
        });
      } else {
        this.flashMessage.show('Something went wrong.', {
          cssClass:
            'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4',
          timeout: 3000,
        });
    }


    const productObservable = this.authService.updateProductbyID(this.id, item)
    productObservable.subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Item was updated successfully.',{cssClass: 'bg-green-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      }
    });
  }
}
