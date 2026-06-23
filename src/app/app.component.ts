import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AlertController, Platform } from '@ionic/angular/standalone';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
  ) { }

  async ngOnInit() {
    await this.platform.ready();

    if (Capacitor.isNativePlatform()) {
      await this.initializeBluetooth();
    }
  }

  async initializeBluetooth() {
    try {
      await BleClient.initialize({ androidNeverForLocation: true });

      const isEnabled = await BleClient.isEnabled();
      if (!isEnabled) {
        await this.showBluetoothAlert();
      }
    } catch (error) {
      console.error('Erro ao inicializar Bluetooth:', error);
    }
  }

  private async showBluetoothAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Bluetooth desativado',
      message: 'Ative o Bluetooth para usar este aplicativo.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Agora não',
          role: 'cancel',
        },
        {
          text: 'Ativar',
          handler: () => {
            window.open('intent:#Intent;action=android.settings.BLUETOOTH_SETTINGS;end', '_system');
          },
        },
      ],
    });

    await alert.present();
  }
}
