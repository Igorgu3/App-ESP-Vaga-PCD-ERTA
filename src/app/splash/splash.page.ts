import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonButton, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  isSplashVisible = true;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isSplashVisible = false;
    }, 5000);
  }

}
