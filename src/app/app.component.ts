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

      // Re-verifica quando o usuário volta ao app (ex.: saiu para as configurações)
      this.platform.resume.subscribe(async () => {
        const isEnabled = await BleClient.isEnabled();
        if (!isEnabled) {
          await this.showBluetoothPrompt();
        }
      });
    }
  }

  async initializeBluetooth() {
    try {
      // initialize() já solicita as permissões em runtime no Android 12+
      await BleClient.initialize({ androidNeverForLocation: true });

      const isEnabled = await BleClient.isEnabled();
      if (!isEnabled) {
        await this.showBluetoothPrompt();
      }
    } catch (error) {
      console.error('Erro ao inicializar Bluetooth:', error);
    }
  }

  private async showBluetoothPrompt() {
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
          role: 'confirm',
        },
      ],
    });

    await alert.present();

    // Espera o alerta fechar COMPLETAMENTE antes de chamar o dialog nativo
    const { role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      try {
        await BleClient.enable();
      } catch {
        // Usuário recusou o dialog nativo do Android
      }
    }
  }
}
