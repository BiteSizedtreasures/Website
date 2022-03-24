import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Title } from '@angular/platform-browser';
import {FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Subscription } from 'rxjs';
import { Product } from '../admin/product.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  name: String;
  allergins: String;
  ingredients: String;
  price: Number;
  coating: String;
  decoration: String;
  allProducts: any = [];

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private title: Title,
    private authService: AuthService,
    private validateService: ValidateService
  ) {
    this.title.setTitle('Admin Page');
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }


  // Toggle through Functions
  showTab =0;
  tabToggle(index: number) {
    if (this.showTab == 0){
      this.fetchAllProducts();
    }
    this.showTab = index;
  }

  fetchAllProducts() {
    const productsObservable = this.authService.fetchAllProducts()
    productsObservable.subscribe((data: any) => {
      data = Object.values(data)
      this.allProducts = data
    })
  }

  onDelete(postID: string) {
    const deleteObservable = this.authService.deleteProduct(postID)
    deleteObservable.subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Product Deleted',{cssClass: 'bg-green-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
        this.router.navigate(['/admin']);
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      }
    })
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
    if(!this.validateService.validateAddProduct(item)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      return false;
    }

    // Add Item to database
    this.authService.addProduct(item).subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Item was added successfully.',{cssClass: 'bg-green-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
        this.router.navigate(['/admin']);
      }
    });
  }

}
