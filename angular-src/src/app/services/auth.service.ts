import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  item: any;
  constructor(
    private http: HttpClient
  ) {}
  
  addItem(item : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/products/addproduct', item, { 
      headers: headers,
    });
  }

}
