import { Component, OnInit,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonContent, IonHeader, IonTitle, IonToolbar,IonButtons, IonBackButton, IonButton,IonList,IonItem,IonSelect,IonSelectOption } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import Services from 'src/app/services/services';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
  standalone: true,
  imports: [IonModal,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonBackButton, IonButton,IonList,IonItem,IonSelect,IonSelectOption]
})
export class SitesPage implements OnInit {

  paises: any[] = [];
  ciudades: any[] = [];
 
  constructor() { }

  ngOnInit() {
    this.obtenerPaises();
  }

  obtenerPaises() {
      Services.getPaises().then( response => {
        this.paises = response.data;
      });
    }

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  type: string = '';
  description: string = '';
  countryId: number = 0;
  cityId: number = 0;

  onInputChange(event: any, field: string) {
    const value = event.target.value;
    if (field === 'name') this.name = value;
    if (field === 'type') this.type = value;
    if (field === 'description') this.description = value;
  }

  cancel() {
    this.modal.dismiss(null, 'cancelar');
  }

  confirm() {
    Services.crearSitio(this.name, this.type, this.description, this.cityId).then(response => {
      if(response.status == 201) {
        console.log(response.data);
      } else {

      }
    }).catch(error => {
      console.error('Error during crearSitio:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      alert('Error durante la creación del sitio.');
    });
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirmar') {
      console.log('Modal confirmed with name:', event.detail.data);
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  searchCity(event: any) {
    const countryId = event.detail.value;
    Services.getCitiesByCountry(countryId).then(response => {
      this.ciudades = response.data;
    });
  }

}
