import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService } from 'flash-messages-angular';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username?: string;
  pass?: string;
  firstname?: string;
  lastname?: string;

  constructor(
    private title:Title,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) { 
    this.title.setTitle('Login Page');
  }

  ngOnInit(): void {
  }

  showTab = 0;
  toggle(index: number) {
    this.showTab = index;
  }

  OnUserSignUp() {
    const user = {
      username: this.username,
      pass: this.pass,
      firstname: this.firstname,
      lastname: this.lastname,
    }

    // Required fields
    if(!this.validateService.validateUser(user)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      return false;
    }

    // Add user to database
    this.authService.addNewUser(user).subscribe((data: any) => {
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
      username: this.username,
      pass: this.pass,
    }

    // Required fields
    if(!this.validateService.validateUser(user)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      return false;
    }
  }

}
