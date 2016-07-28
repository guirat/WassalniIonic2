import {Component} from '@angular/core';
import {TransportData} from '../../providers/transport-data';
import {Geolocation} from 'ionic-native';
import {App, Page, Modal, Alert, NavController, ItemSliding, List} from 'ionic-angular';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';

@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
    
  constructor(private transData: TransportData, private nav: NavController) {}

  ionViewLoaded() {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer; 
   
    // show map
    this.transData.getMap().then(mapData => {
     var currentPosition:google.maps.LatLng;
     var currentPos:string;
     let mapEle = document.getElementById('map');
     let map = new google.maps.Map(mapEle, {
        zoom: 16
      });
  
    //current position   
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
          currentPos=lat+","+lng;
         currentPosition=new google.maps.LatLng(lat,lng);
          map.setCenter(currentPosition);
          markerCurrentPostion.setPosition(currentPosition);   
             }, (err) => {
              console.log('errrrrrrreur');
                });

      // mark stations
      mapData.forEach(markerData => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.STOP_NAME}</h5>`
        });
/*         let pos=new google.maps.LatLng(markerData.STOP_LAT,markerData.STOP_LON);
*/       
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
          //// trace route
           let dest =markerData.STOP_LAT+","+markerData.STOP_LON; 
          
            directionsService.route({
            origin:currentPos,
            destination:dest,
            travelMode: google.maps.TravelMode.WALKING
             }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                console.log(response);
                directionsDisplay.setDirections(response);
                } 
              });
              directionsDisplay.setMap(map);
             }); 
        });
   
        google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

    });
  }
  
    // filtre
    excludeTracks = [];
   presentFilter() {
    let modal = Modal.create(ScheduleFilterPage, this.excludeTracks);
    this.nav.present(modal);

    modal.onDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        //this.updateSchedule();
      }
    });

  }

   //getAddress
 public getAddress(latitude: number, longitude: number):Promise<any>{
    let center = new google.maps.LatLng(latitude, longitude);
    return new Promise(function(resolve, reject){
      new google.maps.Geocoder().geocode({'location':center}, function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          resolve(results);
        }else{
          reject(status);
        }
      });
    });
  }

}
