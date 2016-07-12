import {Component} from '@angular/core';
import {Page} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  constructor(private confData: ConferenceData) {}

  ionViewLoaded() {
  
    this.confData.getMap().then(mapData => {
     let mapEle = document.getElementById('map');
     let map = new google.maps.Map(mapEle, {
        zoom: 16
      });
      let options = {timeout: 10000, enableHighAccuracy: true};
      Geolocation.getCurrentPosition(options).then((position) => {
         let lat = position.coords.latitude;
         let lng = position.coords.longitude;
          map.setCenter(new google.maps.LatLng(lat,lng));
        }, (err) => {
            console.log('errrrrrrreur');
        });

      mapData.forEach(markerData => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData,
          icon:'img/BusStationMarker.png',
          map: map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

    });
  }
}
