import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
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
    private route: ActivatedRoute,
  ) { }

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

}
