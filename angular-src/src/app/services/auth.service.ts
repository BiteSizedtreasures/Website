import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../components/admin/product.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  item: any;

  constructor(
    private http: HttpClient
  ) {}

  addProduct(item : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(baseUrl+ 'products/', item, {
      headers: headers,
    });
  }

  fetchAllProducts() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const products = this.http.get(baseUrl + 'products/', {
      responseType: 'json',
      headers: headers
    })
    return products;
  }

  deleteProduct(productId: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(baseUrl + 'products/' + productId, {
      headers: headers
    })
  }
}
