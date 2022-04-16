import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  allProducts: any[];

  constructor(
    private title: Title,
    private authService: AuthService
  ) {
    this.title.setTitle('Menu Page');
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    const productsObservable = this.authService.fetchAllProducts();
    productsObservable.subscribe((data: any) => {
      data = Object.values(data);
      this.allProducts = data;
    });
  }
}
