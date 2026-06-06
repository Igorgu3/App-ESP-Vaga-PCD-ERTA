import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonButton, IonInput, NavController, IonBackButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonInput, IonButton, IonContent, IonHeader, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  toLogin() { }

  toForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }

  toRegister(){
    this.navCtrl.navigateForward('/register');
  }

  onBackButton() {
    this.navCtrl.navigateBack('/splash');
  }

}
