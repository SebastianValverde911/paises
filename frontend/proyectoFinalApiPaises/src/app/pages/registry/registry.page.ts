import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelectOption, IonItem, IonSelect, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton,IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import Services from '../../services/services';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
  standalone: true,
  imports: [IonItem,IonSelectOption,  IonSelect, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput, IonButtons,IonBackButton]
})
export class RegistryPage implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';
  role: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionChangeInputEmail(event:any){
    this.email = event.target.value;
  }

  ionChangeInputPassword(event:any){
    this.password = event.target.value;
  }

  ionChangeInputName(event:any){
    this.name = event.target.value;
  }

  register() {
    //this.router.navigate(['/login']);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Name:', this.name);  
    console.log('Role:', this.role);
    
    Services.register(this.email, this.password, this.name, this.role).then(response => {
      if(response.data.status == 'OK') {
        console.log('Registration successful:', response.data);
        this.router.navigate(['/login'], { replaceUrl: true }); // Redirige a la pestaña 1 después del registro exitoso
      } else {
        // Manejar el caso de error en el registro
        console.error('Registration failed:', response.data);
      }
    }).catch(error => {
      console.error('Error during registration:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      alert('Error durante el registro. Por favor, verifica tus datos.');
    });
    
  }

  handleChangeSelect(event: any) {
    this.role = event.target.value;
    
  }
  

}
