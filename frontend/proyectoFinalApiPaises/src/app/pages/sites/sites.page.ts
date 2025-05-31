import { Component, OnInit,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon , IonDatetime, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonModal, IonContent, IonHeader, IonTitle, IonToolbar,IonButtons, IonBackButton, IonButton,IonList,IonItem,IonSelect,IonSelectOption } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import Services from 'src/app/services/services';
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { logoIonic,heart,camera,heartOutline,cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
  standalone: true,
  imports: [IonIcon,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonModal, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, IonList, IonItem, IonSelect, IonSelectOption, IonDatetime]
})
export class SitesPage implements OnInit {

  paises: any[] = [];
  ciudades: any[] = [];
  sitios: any[] = [];
  siteId: number = 0;
  userInfo: any = {};
  public latitude: number = 0;
  public longitude: number = 0;
  famosos: any[] = [];

  constructor(private storage: StorageService,private cdr: ChangeDetectorRef) {
    addIcons({ logoIonic, heart, camera,heartOutline,cameraOutline });
  }

  async ngOnInit() {
    this.obtenerPaises();
    this.userInfo = await this.storage.get('userInfo');
    if (this.userInfo) {
      //console.log('Usuario:', this.userInfo);
    }
    this.getFamosos();
  }

  registrarVisita(siteId: number) {
    this.siteId = siteId;
    this.modalVisita.present();
  }

  registrarPlato(siteId: number) {
    this.siteId = siteId;
    this.modalPlato.present();
  }

  crearSitio() {
    this.modal.present();
  }

  obtenerPaises() {
      Services.getPaises().then( response => {
        this.paises = response.data;
      });
    }

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modalVisita', { static: false }) modalVisita!: IonModal;
  @ViewChild('modalPlato', { static: false }) modalPlato!: IonModal;
  @ViewChild('modalTag', { static: false }) modalTag!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  type: string = '';
  description: string = '';
  countryId: number = 0;
  cityId: number = 0;
  platoName: string = '';
  platoPrice: number = 0;
  fechaVisita: string = '';

  onInputChange(event: any, field: string) {
    const value = event.target.value;
    if (field === 'name') this.name = value;
    if (field === 'type') this.type = value;
    if (field === 'description') this.description = value;
    if (field === 'platoName') this.platoName = value;
    if (field === 'platoPrice') this.platoPrice = value;
  }

  onFechaChange(event: any) {
    // El valor seleccionado está en event.detail.value
    console.log('Fecha seleccionada:', event.detail.value);
    this.fechaVisita = event.detail.value;
  }

  cancel() {
    this.modal.dismiss(null, 'cancelar');
  }

  cancelPlato() {
    this.modalPlato.dismiss(null, 'cancelar');
  }

  cancelVisita(){
    this.modalVisita.dismiss(null, 'cancelar');
  }

  cancelTag() {
    this.modalTag.dismiss(null, 'cancelar');
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
    this.modal.dismiss(null, 'confirmar');
  }

  confirmPlato() {
    Services.crearPlato(this.platoName, this.platoPrice, this.siteId).then(response => {
      if(response.status == 201) {
        console.log('Plato creado:', response.data);
      } else {
        console.error('Error al crear plato:', response);
      }
    }).catch(error => {
      console.error('Error durante crearPlato:', error);
      alert('Error durante la creación del plato.');
    });

    this.modalPlato.dismiss(null, 'confirmar');

  }
  confirmVisita() {
    Services.crearVisita(this.fechaVisita, this.siteId, this.userInfo.id).then(response => {
      if(response.status == 201) {
        console.log('Visita creada:', response.data);
      } else {
        console.error('Error al crear visita:', response);
      }
    }).catch(error => {
      console.error('Error durante crearVisita:', error);
      alert('Error durante la creación de la visita.');
    });

    this.modalVisita.dismiss(null, 'confirmar');
  }
  confirmTag() {
    alert('Tag agregado al sitio: ' + this.siteId+' userId: '+this.userInfo.id+' SiteId: '+this.siteId+' latitude: '+this.latitude+' longitude: '+this.longitude);
    this.modalTag.dismiss(null, 'confirmar');
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

  searchSitioPais(event: any) {
    const countryId = event.detail.value;
    Services.getSitiosByCountry(countryId).then(response => {
      this.sitios = response.data;
    });
  }

  addTag(siteId: number) {
    console.log('Tag agregado al sitio:', siteId);
    this.modalTag.present();
  }

  imageUrl: string | undefined = '';
  takePhoto = async () => {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.imageUrl = image.webPath;

      // Can be set to the src of an image now
      //imageElement.src = this.imageUrl;
  }

  async geolocalizar() {
    const coordinates = await Geolocation.getCurrentPosition();
    alert("Obteniendo coordenadas... ");
    if(coordinates) {
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }

  addFavorito(sitio:any) {
    this.storage.saveRemoveSitio(sitio);
  }

  esFavorito(unSitio:any):boolean {
    if(this.storage.sitiosInFavorites(unSitio)){
      return true;
    }
    else {
      return false;
    }
  }

  getFamosos(){
    Services.getAllFamosos().then(response => {
      if(response.status == 200) {
        console.log('Famosos obtenidos:', response.data);
        this.famosos = response.data;
      } else {
        console.error('Error al obtener famosos:', response);
      }
    }).catch(error => {
      console.error('Error durante getFamosos:', error);
      alert('Error al obtener los famosos.');
    });
  }

}
