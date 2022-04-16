import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService } from 'flash-messages-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string; // '?' say is an auto-initializer to blank string 
  password: string;
  firstname: string;
  lastname: string;
  allUsers: any = [];

  constructor(
    private title:Title,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) { 
    this.title.setTitle('Login Page');
  }

  ngOnInit() {  }

  showTab = 0;
  toggle(index: number) {
    this.showTab = index;
  }

  OnUserSignUp() { //register function for the frontend
    const user = {
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
    }

    // Required fields
    if(!this.validateService.validateUser(user)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      return false;
    }

    // Add user to database
    this.authService.registerUser(user).subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('User was successfully registered.',{cssClass: 'bg-green-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
        this.router.navigate(['/login']);
      } 
      else {
        this.flashMessage.show('Something went wrong', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
        this.router.navigate(['/register']);
      }
      return true;
    });
  }

  OnUserSignIn() {
    const user = {
      email: this.email,
      password: this.password,
    }

    // Required fields
    if(!this.validateService.validateLogin(user)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      return false;
    }

    this.authService.authUser(user).subscribe((data: any) => {
      if(data.success){
        console.log("Is Login Success: " + data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Login Successful!', {cssClass: 'alert-success', timeout:5000});
        this.router.navigate(['home']);
      }else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout:5000});
        this.router.navigate(['login']);
      }
    });
  }
}
