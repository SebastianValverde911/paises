import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonMenuToggle,IonLabel,IonIcon,IonItem,IonList, IonMenuButton, IonButtons, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { home,globe,accessibility } from 'ionicons/icons';
import { Router } from '@angular/router';
import Services from '../../services/services'
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonAlert, IonMenuToggle,IonLabel,IonIcon,IonItem,IonList,IonButtons,IonMenuButton, IonMenu,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  @ViewChild('ciudadAlert', { static: false }) ciudadAlert!: IonAlert;
  @ViewChild('paisAlert', { static: false }) paisAlert!: IonAlert;
  nombreUserConnect: string = '';
  constructor(private storage: StorageService, private router: Router) { 
    addIcons({home,globe,accessibility});
  }

  public alertPaisButtons = [
  {
    text: 'Crear',
    handler: (data:any) => {
      Services.crearPais(data.nombre).then(response => {
            if(response.data.status == 'OK') {
              console.log(response.data.info);
            } else {
      
            }
          }).catch(error => {
            console.error('Error during crearPais:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
            alert('Error durante la creación del pais.');
          });
    }
  }
];
  public alertPaisInputs = [
    {
      name: 'nombre',
      placeholder: 'Nombre',
    }
  ];

  nombreCiudad: string = '';
  public alertCiudadButtons = [
    {
      text: 'Siguiente',
      handler: (data:any) => {
        this.nombreCiudad = data.nombre;
        setTimeout(() => {
        this.paisAlert.present();
      }, 0);
      }
    }
  ];

  
  public alertCiudadInputs = [
    {
      name: 'nombre',
      placeholder: 'Nombre',
    }
  ];

  public alertCiudadPaisButtons = [
    {
      text: 'Crear',
      handler: (data:any) => {
        console.log(this.nombreCiudad);
        console.log(data);
        Services.crearCiudad(this.nombreCiudad, data).then(response => {
          console.log(response);
          console.log(response.data);
        })
      }
    }
  ];

  public alertCiudadPaisInputs = [
    {
        type: 'radio',
        label: 'prueba',
        value: 2
    }
  ];
 

  presentCiudadAlert() {
    Services.getPaises().then( response => {
      
      const paises = response.data;
      const paisesInputs = paises.map((pais: any) => ({
          type: 'radio',
          label: pais.name, 
          value: pais.id 
        }));
       
      this.alertCiudadPaisInputs = [
        
        ...paisesInputs
      ];

      setTimeout(() => {
        this.ciudadAlert.present();
      }, 0);
      
    });
  }
  

  async ngOnInit() {
    const data = await this.storage.get('userInfo');
    if (data) {
      this.nombreUserConnect = data.name;
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.storage.set('userInfo','');
  }

  saludo() {
    //console.log('Hola, ' + this.nombreUserConnect);
  }
}
