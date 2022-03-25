import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

  fetchProductbyID(productID: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const product = this.http.get(baseUrl + 'products/' + productID, {
      headers: headers
    });
    return product;
  }

  deleteProduct(productId: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(baseUrl + 'products/' + productId, {
      headers: headers
    })
  }

  updateProduct(id: string, item : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(baseUrl + 'products/' + id, item)
  }
}
