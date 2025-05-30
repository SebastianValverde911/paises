import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle,   IonAlert, IonMenuToggle,IonLabel,IonIcon,IonItem,IonList, IonMenuButton, IonButtons, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { home,globe,accessibility,people, time,pizza } from 'ionicons/icons';
import { Router } from '@angular/router';
import Services from '../../services/services'
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonCardContent,IonCardTitle, IonAlert, IonMenuToggle,IonLabel,IonIcon,IonItem,IonList,IonButtons,IonMenuButton, IonMenu,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  lugaresVisitados: any[] = [];
  sitiosFavoritos: any[] = [];
  paises: any[] = [];
  ciudades: any[] = [];
  famosos: any[] = [];
  sitios: any[] = [];
  platos: any[] = [];

  @ViewChild('ciudadAlert', { static: false }) ciudadAlert!: IonAlert;
  @ViewChild('paisAlert', { static: false }) paisAlert!: IonAlert;
  @ViewChild('paisFamosoAlert', { static: false }) paisFamosoAlert!: IonAlert;
  @ViewChild('ciudadFamosoAlert', { static: false }) ciudadFamosoAlert!: IonAlert;
  nombreUserConnect: string = '';
  constructor(private storage: StorageService, private router: Router) { 
    addIcons({home,globe,accessibility,people,time,pizza});
  }

  getVisitPlaces(user_id: number) {
    Services.getVisitsByUser(user_id).then(response => {
      this.lugaresVisitados = response.data; 
    }).catch(error => {
      console.error('Error during getVisitsByUser:', error);
      alert('Error al obtener los lugares visitados.');
    });
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
        Services.crearCiudad(this.nombreCiudad, data).then(response => {
          console.log(response);
          if(response.status == 201) {
            console.log(response.data);
          } else {
            console.log("Hay un error en la creacion de la ciudad");
          }
        }).catch(error => {
            console.error('Error during crear ciudad:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
            alert('Error durante la creación de la ciudad.');
          });
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
    setTimeout(() => {
        this.ciudadAlert.present();
    }, 0);
  }

  nombreFamoso: string = '';
  motivoFamoso: string = '';
  public alertFamosoButtons = [
    {
      text: 'Siguiente',
      handler: (data:any) => {
        this.nombreFamoso = data.nombre;
        this.motivoFamoso = data.motivo; 
        setTimeout(() => {
        this.paisFamosoAlert.present();
      }, 0);
      }
    }
  ];

  
  public alertFamosoInputs = [
    {
      name: 'nombre',
      placeholder: 'Nombre del famoso',
    },
     {
      name: 'motivo',
      placeholder: 'Motivo de la fama',
    }
  ];

  paisFamoso: number = 0;
  public alertPaisFamosoButtons = [
    {
      text: 'Siguiente',
      handler: (data:any) => {
        this.paisFamoso = data;
        Services.getCitiesByCountry(this.paisFamoso).then(response => {
          const ciudades = response.data;
          const ciudadesInputs = ciudades.map((ciudad: any) => ({
              type: 'radio',
              label: ciudad.name, 
              value: ciudad.id 
            }));
           
          this.alertCiudadFamosoInputs = [
            ...ciudadesInputs
          ];
          setTimeout(() => {
            this.ciudadFamosoAlert.present();
          }, 0);
        }).catch(error => {
          console.error('Error during getCitiesByCountry:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
          alert('Error al obtener las ciudades del país seleccionado.');
        });
      }
    }
  ];

  
  public alertPaisFamosoInputs = [
    {
      type: 'radio',
      label: 'prueba',
      value: 2
    }
  ];

  public alertCiudadFamosoButtons = [
    {
      text: 'Crear',
      handler: (data:any) => {
        Services.crearFamoso(this.nombreFamoso, this.motivoFamoso, data).then(response => {
          console.log(response);
          if(response.status == 201) {
            console.log(response.data);
          } else {
            console.log("Hay un error en la creacion del famoso");
          }
        }).catch(error => {
            console.error('Error during crear famoso:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
            alert('Error durante la creación del famoso.');
          });
        
      }
    }
  ];

  
  public alertCiudadFamosoInputs = [
    {
      type: 'radio',
      label: 'prueba',
      value: 2
    }
  ];

  presentFamosoAlert() {

  }

  obtenerPaises() {
    Services.getPaises().then( response => {
      
      this.paises = response.data;
      const paisesInputs = this.paises.map((pais: any) => ({
          type: 'radio',
          label: pais.name, 
          value: pais.id 
        }));
       
      this.alertCiudadPaisInputs = [
        ...paisesInputs
      ];

      this.alertPaisFamosoInputs = [
        ...paisesInputs
      ];
    });
    this.getCiudades();
  }
  
  async ionViewWillEnter() {
    const data = await this.storage.get('userInfo');
    this.sitiosFavoritos = await this.storage.get('sitiosFavoritos');
    console.log('Sitios Favoritos:', this.sitiosFavoritos);    
    this.nombreUserConnect = data?.name || '';
    this.obtenerPaises();
    this.getVisitPlaces(data?.id || 0);
    this.traerTodosLosPlatos();
  }

  ngOnInit() {
   
  }

  logout() {
    this.router.navigate(['/login']);
    this.storage.set('userInfo','');
  }

  saludo() {
    //console.log('Hola, ' + this.nombreUserConnect);
  }

  goToSites() {
    this.router.navigate(['/sites']);
  }

  async getCiudades() {
    this.ciudades = [];
    const promises = this.paises.map(pais =>
      Services.getCitiesByCountry(pais.id)
        .then(response => {
          this.ciudades.push(...response.data);
        })
        .catch(error => {
          console.error('Error during getCiudades:', error);
          alert('Error al obtener las ciudades.');
        })
    );
    await Promise.all(promises);
    this.getFamososByCity();
    this.getSitiosByCity();
  }

  getPaisNameById(id: number): string {
    const pais = this.paises.find(p => p.id === id);
    return pais ? pais.name : '';
  }

  getFamososByCity() {
    console.log('Obteniendo famosos por ciudad...');
    this.famosos = [];
    this.ciudades.forEach(ciudad => {
      Services.getFamososByCity(ciudad.id).then(response => {
        this.famosos.push(...response.data);
      }).catch(error => {
        console.error('Error during getFamososByCity:', error);
        alert('Error al obtener los famosos de la ciudad.');
      });
    });
  }

  getSitiosByCity() {
    this.sitios = [];
    this.ciudades.forEach(ciudad => {
      Services.getSitesByCity(ciudad.id).then(response => {
        this.sitios.push(...response.data);
      }).catch(error => {
        console.error('Error during getSitiosByCity:', error);
        alert('Error al obtener los sitios de la ciudad.');
      });
    });
  }

  traerTodosLosPlatos() {
    Services.getAllFood().then(response => {
      this.platos = response.data;
    }).catch(error => {
      console.error('Error during getAllFood:', error);
      alert('Error al obtener los platos.');
    });
  }
}
