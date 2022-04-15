import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  name?: String;
  allergins?: String;
  ingredients?: String;
  price?: Number;
  coating?: String;
  decoration?: String;
  allProducts: any = [];

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private title: Title,
    private authService: AuthService,
    private validateService: ValidateService,
  ) {
    this.title.setTitle('Admin Page');
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }
  // Toggle All Products and Add Product
  showTab =0;
  tabToggle(index: number) {
    if (this.showTab == 0){
      this.fetchAllProducts();
    }
    this.showTab = index;
  }

  fetchAllProducts() {
    const productsObservable = this.authService.fetchAllProducts();
    productsObservable.subscribe((data: any) => {
      data = Object.values(data);
      this.allProducts = data;
    });
  }

  onDelete(productID: string) {
    const deleteObservable = this.authService.deleteProduct(productID);
    deleteObservable.subscribe((data: any) => {
      if (data.success) {
        this.flashMessage.show('Product Deleted', {
          cssClass:
            'bg-green text-white rounded-lg p-4',
          timeout: 3000,
        });
        this.router.navigate(['/admin']);
      } else {
        this.flashMessage.show('Something went wrong.', {
          cssClass:
            'bg-colors-red-600 text-white rounded-lg p-4',
          timeout: 3000,
        });
      }
    });
    const productsObservable = this.authService.fetchAllProducts()
    productsObservable.subscribe((data: any) => {
      data = Object.values(data)
      this.allProducts = data
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
    };

    // Required fields
    if (!this.validateService.validateAddProduct(item)) {
      this.flashMessage.show('Please fill in all the required fields.', {
        cssClass: 'bg-colors-red-600 text-white rounded-lg p-4',
        timeout: 3000,
      });
      return false;
    }

    // Add Item to database
    this.authService.addProduct(item).subscribe((data: any) => {
      if (data.success) {
        this.flashMessage.show('Item was added successfully.', {
          cssClass:
            'bg-green text-white rounded-lg p-4',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show('Something went wrong.', {
          cssClass:
            'bg-colors-red-600 text-white rounded-lg p-4',
          timeout: 3000,
        });
        this.router.navigate(['/admin']);
      }
    });
  }

}
