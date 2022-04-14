import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'flash-messages-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importing Components (Website Pages)
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';

import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes =[
  { path: '', component: HomeComponent},
  { path: 'register', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'product/:id', component: AdminEditComponent},
  { path: 'cart', component: CartComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'contact', component: ContactComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    MenuComponent,
    AdminComponent,
    LoginComponent,
    AdminEditComponent,
    LogoutComponent,
    CartComponent,
    CalendarComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    FormsModule,
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
