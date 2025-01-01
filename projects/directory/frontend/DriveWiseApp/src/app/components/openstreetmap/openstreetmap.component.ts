import { Component, OnInit, NgModule } from '@angular/core';
import { ToastController, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-openstreetmap',
  templateUrl: './openstreetmap.component.html',
  styleUrls: ['./openstreetmap.component.scss'],
})
export class OpenstreetmapComponent implements OnInit {

 

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    
  }

  public async locateCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
      });
    } else {
      this.presentToast('Geolocation is not supported by this browser.');
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}