import {Component} from '@angular/core';
import {Page} from 'ionic-angular';
import {TransportData} from '../../providers/transport-data';
import {Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  constructor(private transData: TransportData) {}

  ionViewLoaded() {
  
    this.transData.getMap().then(mapData => {
      var currentPosition:google.maps.LatLng;
     let mapEle = document.getElementById('map');
     let map = new google.maps.Map(mapEle, {
        zoom: 16
      });

      let markerCurrentPostion = new google.maps.Marker({
          position: map.getCenter(),
          icon:'img/yourlocation.png',
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
          content: `<h5>${markerData.STOP_NAME}</h5>`
        });

        var busstop = {
            url: 'img/busstop.png',
            // size: new google.maps.Size(20, 47),
            // origin: new google.maps.Point(20, 0),
            // anchor: new google.maps.Point(0, 0)
          };

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData.STOP_LAT,markerData.STOP_LON),
          icon:busstop,
          map: map,
          title: markerData.STOP_NAME
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