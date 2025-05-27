import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import Services from '../services/services';
import { Keyboard } from '@capacitor/keyboard';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonInput ],
})
export class HomePage {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private storage: StorageService) {}  

  ngOnInit() {
    Keyboard.setScroll({ isDisabled: true });
  }

  login() {
    Services.login(this.email, this.password).then(response => {
      if(response.data.status == 'OK') {
        this.storage.set('userInfo', response.data.user);
        this.storage.set('token', response.data.token);
        console.log('Login successful:', response.data);
        this.router.navigate(['/dashboard'], { replaceUrl: true }); // Redirige a la pestaña 1 después del inicio de sesión exitoso
      } else {

      }
    }).catch(error => {
      console.error('Error during login:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      alert('Error durante el inicio de sesión. Por favor, verifica tus credenciales.');
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  ionChangeInputEmail(event:any){
    this.email = event.target.value;
  }

  ionChangeInputPassword(event:any){
    this.password = event.target.value;
  }
}
