import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router, RouterModule } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;

  constructor(
    private title: Title,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService,
  ) {
    this.title.setTitle('Contact Us')
  }

  ngOnInit(): void {
  }

  OnItemSubmit() {
    const item = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    }
    if(!this.validateService.validateContactInfo(item)) {
      this.flashMessage.show(
        'Please fill in all the required fields.',
        {cssClass: 'bg-colors-red-600 text-white rounded-lg p-4',
         timeout:3000});
      return false;
    }

    if(!this.validateService.validateEmail(item.email)) {
      this.flashMessage.show('Please use a valid email',
      {cssClass: 'bg-colors-red-600 text-white rounded-lg p-4',
      timeout:3000});
      return false;
    }

    // Send content to email
    this.authService.sendEmail(item).subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Email Sent.', {
          cssClass:'bg-green text-white rounded-lg p-4',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show('Something went wrong.', {
          cssClass:
            'bg-colors-red-600 text-white rounded-lg p-4',
          timeout: 3000,
        });
        this.router.navigate(['/contact']);
      }
    })
  }

}
