import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Title } from '@angular/platform-browser';
import {FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  name: String;
  allergins: String;
  ingredients: String;
  price: Number;
  coating: String;
  decoration: String;
  url: any;
  msg = "";

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private title: Title,
    private authService: AuthService,
    private validateService: ValidateService
  ) { 
    this.title.setTitle('Admin Page');
  }

  ngOnInit(): void {
  }
  
  // Renders the inputted image {Add Product}
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}

  // Toggle through Functions
  showTab = 1;
  tabToggle(index: number) {
    this.showTab = index;
  }

  OnItemSubmit() {
    const item = {
      name: this.name,
      allergins: this.allergins,
      ingredients: this.ingredients,
      price: this.price,
      coating: this.coating,
      decoration: this.decoration,
    }

    // Required fields
    if(!this.validateService.validateMenu(item)) {
      this.flashMessage.show('Please fill in all the required fields.', {cssClass: 'bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4', timeout:3000});
      return false;
    }

    // Add Item to database
    this.authService.addItem(item).subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Item was added successfully.',{cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/admin']);
      }
    });
  }
}
