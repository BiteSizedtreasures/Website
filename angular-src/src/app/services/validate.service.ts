import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // Validates if any input is empty.
  validateAddProduct(info : any) {
    if(
      info.name == undefined ||
      info.allergins == undefined ||
      info.ingredients == undefined ||
      info.price < 0 ||
      info.coating == undefined ||
      info.decoration == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  
  validateUser(user : any) {
    if (
      user.firstname == undefined ||
      user.email == undefined ||
      user.lastname == undefined ||
      user.password == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Validates if email is in correct format
  validateEmail(email : any) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
