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
      var currentPosition:google.maps.LatLng;
     let mapEle = document.getElementById('map');
     let map = new google.maps.Map(mapEle, {
       //center: new google.maps.LatLng(34.7568479,10.712911),
        zoom: 16
      });

      let markerCurrentPostion = new google.maps.Marker({
          position: map.getCenter(),
          icon:'img/BusStationMarker.png',
          map: map,
          animation: google.maps.Animation.DROP,
          title: "I'm here"
        });
      var infowindow = new google.maps.InfoWindow({
      content: "I'm here"
      });
      infowindow.open(map,markerCurrentPostion);
      let options = {timeout: 10000, enableHighAccuracy: true};
      Geolocation.getCurrentPosition(options).then((position) => {
         let lat = position.coords.latitude;
         let lng = position.coords.longitude;
         currentPosition=new google.maps.LatLng(lat,lng);
          map.setCenter(currentPosition);
          markerCurrentPostion.setPosition(currentPosition);
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
