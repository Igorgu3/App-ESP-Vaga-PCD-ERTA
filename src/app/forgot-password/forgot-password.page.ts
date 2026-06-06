import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonContent, IonHeader, IonBackButton, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonBackButton, IonInput, IonButton, CommonModule, FormsModule]
})
export class ForgotPasswordPage {

  // Etapa 1 — identificação da conta
  inputValue = '';
  submittedStep1 = false;

  // Etapa 2 — nova senha
  inputValueNewPassword = '';
  submittedStep2 = false;

  // Flag explícito: só vira true quando "Próximo" passa na validação
  onStep2 = false;

  constructor(private navCtrl: NavController) {}

  onProximo() {
    this.submittedStep1 = true;
    if (!this.inputValue.trim()) return;
    this.onStep2 = true;
  }

  onRedefinir() {
    this.submittedStep2 = true;
    if (!this.inputValueNewPassword.trim()) return;
    console.log('Nova senha definida:', this.inputValueNewPassword);
  }

  onCancelar() {
    this.navCtrl.navigateBack('/login');
  }

}
