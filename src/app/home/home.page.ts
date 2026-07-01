import { Component, ChangeDetectorRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonModal, IonPopover, IonList, IonItem, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, personAddOutline, menuOutline, radioOutline, lockOpenOutline, checkmarkCircleOutline, addCircleOutline } from 'ionicons/icons';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { BleClient } from '@capacitor-community/bluetooth-le';

// UUIDs do serviço BLE do ESP32 — devem coincidir com o firmware
const SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
const CHAR_UUID    = 'abcdef01-1234-1234-1234-123456789abc';

// Fix: corrige os paths dos ícones quebrados pelo bundler do Angular
const iconDefault = L.icon({
  iconUrl: 'assets/leaflet-images/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet-images/marker-icon-2x.png',
  shadowUrl: 'assets/leaflet-images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgClass, IonModal, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonPopover, IonList, IonItem],
})
export class HomePage {

  public items = [
    { name: 'Perfil', icon: 'person-circle-outline' },
    { name: 'Cadastrar novo usuário', icon: 'person-add-outline' },
    { name: 'Cadastrar nova vaga', icon: 'add-circle-outline' },
  ];

  isModalOpen = false;
  vagaSelecionada: string | null = null;

  private map!: L.Map;

  constructor(private cdr: ChangeDetectorRef, private alertCtrl: AlertController) {
    addIcons({ personCircleOutline, personAddOutline, addCircleOutline, menuOutline, radioOutline, lockOpenOutline, checkmarkCircleOutline });
  }

  ionViewDidEnter() {
    if (!this.map) {
      // Inicia centrado na UFMG como fallback enquanto carrega o GPS
      this.map = L.map('map').setView([-19.8711, -43.9674], 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(this.map);

      // Pin fixo da UFMG
      this.adicionarMarker([-19.870770, -43.962995], 'Escola de Engenharia - UFMG');

      Geolocation.getCurrentPosition().then(pos => {
        const { latitude, longitude } = pos.coords;
        this.map.setView([latitude, longitude], 15);

        const iconUsuario = L.divIcon({
          html: '🚗',
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        });

        L.marker([latitude, longitude], { icon: iconUsuario })
          .addTo(this.map)
          .bindPopup('Você está aqui');
      }).catch(() => {
        // Permissão negada ou GPS indisponível: mantém a visão da UFMG
      });
    }

    // Garante que o Leaflet recalcula as dimensões reais do container
    setTimeout(() => this.map.invalidateSize(), 150);
  }

  private adicionarMarker(coords: [number, number], nome: string) {
    const marker = L.marker(coords).addTo(this.map);

    marker.bindPopup(`
      <div style="text-align:center">
        <strong>${nome}</strong><br/>
        <button id="btn-sel-${nome.replace(/\s/g, '')}" style="
          margin-top:8px; padding:6px 14px;
          background:#3880ff; color:#fff;
          border:none; border-radius:8px; cursor:pointer; font-size:13px;
        ">Selecionar esta vaga</button>
      </div>
    `);

    // Eventos do Leaflet ficam fora do zone.js — usa cdr.detectChanges()
    marker.on('popupopen', () => {
      const btn = marker.getPopup()?.getElement()?.querySelector('button');
      if (btn) {
        btn.onclick = () => {
          this.selecionarVaga(nome);
          this.map.closePopup();
        };
      }
    });
  }

  selecionarVaga(nome: string) {
    this.vagaSelecionada = nome;
    this.cdr.detectChanges(); // força Angular a atualizar o [disabled] do botão
  }

  private async conectarESP(): Promise<void> {
    const device = await BleClient.requestDevice({ namePrefix: 'VAGA-TA' });

    await BleClient.connect(device.deviceId);

    try {
      const data = new DataView(new ArrayBuffer(1));
      data.setUint8(0, 0x01);
      await BleClient.write(device.deviceId, SERVICE_UUID, CHAR_UUID, data);
    } finally {
      await BleClient.disconnect(device.deviceId);
    }
  }

  public async onLiberarVaga() {
    try {
      await this.conectarESP();
      this.setOpen(true);
    } catch (error) {
      console.error('Erro BLE:', error);
      const alert = await this.alertCtrl.create({
        header: 'Falha na conexão',
        message: 'Não foi possível comunicar com a vaga. Verifique se o Bluetooth está ativo e tente novamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  onItemClicked(item: { name: string; icon: string }) {
    console.log('Item selecionado:', item.name);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
