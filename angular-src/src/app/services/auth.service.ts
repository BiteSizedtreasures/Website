import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LoginComponent } from '../components/login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';

//const baseUrl = 'http://localhost:8080/'; // Development
const baseUrl = ''; // Production
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  item: any;
  user: any;
  tokAuth: any;
  isUserLoggedIn: boolean = false;
  
  constructor(
    private http: HttpClient
  ) {}

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(baseUrl + 'users/', user, { headers: headers });
    // .pipe(map((res: any) => res.json()));
  }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(baseUrl + 'users/', user, { headers: headers });
    // .pipe(map((res: any) => res.json()));
  }

  loggedIn() {
    const jwtHelper = new JwtHelperService();
    return (jwtHelper.isTokenExpired(this.tokAuth));
  }

  storeUserData(tok: any, user: any){
    localStorage.setItem('id_token', tok);
    localStorage.setItem('user', JSON.stringify(user));
    this.tokAuth = tok;
    this.user = user;
  }

  authUser(user: any){
    let head = new HttpHeaders();
    head.append('Content-Type', 'application/json');
    return this.http.post(baseUrl + 'users/authenticate', user, {headers:head});
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