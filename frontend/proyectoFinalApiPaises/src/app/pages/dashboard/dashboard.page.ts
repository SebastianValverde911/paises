import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  nombreUserConnect: string = '';
  constructor(private storage: StorageService) { 
    
  }

  async ngOnInit() {
  const data = await this.storage.get('userInfo');
  if (data) {
    this.nombreUserConnect = data.name;
    console.log('Nombre del usuario:', this.nombreUserConnect);
  }
}

}
