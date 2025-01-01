import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-openstreetmap',
  templateUrl: './openstreetmap.component.html',
  styleUrls: ['./openstreetmap.component.scss'],
})
export class OpenstreetmapComponent implements OnInit {

  private map: L.Map;

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([51.5, -0.09]).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
  }

  public async locateCurrentPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.map.setView([lat, lon], 13);
        L.marker([lat, lon]).addTo(this.map)
          .bindPopup('You are here!')
          .openPopup();
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
