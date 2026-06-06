import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonInput, IonButton, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonBackButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  toLogin() {
    this.navCtrl.navigateForward('/login');
  }

  toForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }

  register(){
    console.log('Registrar usuário');
  }

  onBackButton() {
    this.navCtrl.navigateBack('/splash');
  }

}
