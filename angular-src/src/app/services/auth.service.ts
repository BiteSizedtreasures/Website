import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../components/admin/product.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  item: any;
  private posts: Product[] = [];
  private postsUpdated = new Subject<Product[]>();

  constructor(
    private http: HttpClient
  ) {}

  addProduct(item : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/products/', item, {
      headers: headers,
    });
  }

  fetchAllProducts() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<{ message: string, posts: any }>('http://localhost:8080/products/')
      .pipe(map((postData: any) => {
        return postData.posts.map((post: any) => {
          return post.product;
        })
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }


}
