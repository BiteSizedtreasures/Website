import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//const baseUrl = 'http://localhost:8080/'; // Development
const baseUrl = ''; // Production
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  item: any;
  constructor(
    private http: HttpClient
  ) {}

  addNewUser(user: any){
    let head = new HttpHeaders();
    head.append('Content-Type', 'application/json');
    return this.http.post(baseUrl+ 'users/', user, {headers: head});
  }

  authUser(user: any){
    let head = new HttpHeaders();
    head.append('Content-Type', 'application/json');
    return this.http.post(baseUrl + 'users/', {headers:head});
  }

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

  updateProductbyID(productID: string, item : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const product = this.http.put(baseUrl + 'products/' + productID, item, {
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
}