import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonModal, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, personAddOutline, briefcaseOutline, menuOutline, radioOutline, lockOpenOutline, checkmarkCircleOutline, addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonModal, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonPopover, IonList, IonItem],
})
export class HomePage {

  public items = [
    { name: 'Perfil', icon: 'person-circle-outline' },
    { name: 'Cadastrar novo usuário', icon: 'person-add-outline' },
    { name: 'Cadastrar nova vaga', icon: 'add-circle-outline' },
  ];

  isModalOpen = false;

  constructor() {
    addIcons({ personCircleOutline, personAddOutline, addCircleOutline, menuOutline, radioOutline, lockOpenOutline, checkmarkCircleOutline });
  }

  public onLiberarVaga() {
    this.setOpen(true);
  }

  onItemClicked(item: { name: string; icon: string }) {
    console.log('Item selecionado:', item.name);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
