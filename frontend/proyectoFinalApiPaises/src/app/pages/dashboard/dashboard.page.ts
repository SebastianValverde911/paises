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
  data: any[] = [];
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
  nombreUserConnect: string = '';
  constructor(private storage: StorageService, private router: Router) { 
    addIcons({home,globe,accessibility});
  }

  async ngOnInit() {
    const data = await this.storage.get('userInfo');
    if (data) {
      this.nombreUserConnect = data.name;
      console.log('Nombre del usuario:', this.nombreUserConnect);
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.storage.set('userInfo','');
  }

  saludo() {
    console.log('Hola, ' + this.nombreUserConnect);
  }
}
