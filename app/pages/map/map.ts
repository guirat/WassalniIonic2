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
      let mapEle = document.getElementById('map');
      let map = new google.maps.Map(mapEle, {
        zoom: 16
      });
      let dest:string ;
      var currentPos:string;

    // show map
    this.transData.getMap().then(mapData => {
    var currentPosition:google.maps.LatLng;
    
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
/*
navigator.geolocation.watchPosition(
    function (position) {
        setMarkerPosition(
            currentPositionMarker,
            position
        );
    });

function setMarkerPosition(marker, position) {
    marker.setPosition(
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude)
    );
}
*/

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
   
         Geolocation.watchPosition((position)=>{
              markerCurrentPostion.setPosition( new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude)
    );
     }
    );

      //  stations markers

         let infoWindow = new google.maps.InfoWindow();
          mapData.forEach(markerData => {
     
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

               infoWindow.setContent(`<h5>${markerData.STOP_NAME}</h5>`);
          infoWindow.open(map, marker);
          //// trace route

            dest=markerData.STOP_LAT+","+markerData.STOP_LON; 

        /*    directionsService.route({
            origin:currentPos,
            destination:dest,
            travelMode: google.maps.TravelMode.WALKING
             }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                console.log(response);
                directionsDisplay.setDirections(response);
                } 
              });
              directionsDisplay.setMap(map);*/
var request = {
    origin: currentPos,
    destination: dest,
    travelMode: google.maps.TravelMode.WALKING,
    provideRouteAlternatives: true,
  };
  
   directions.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      renderer.setDirections(response);
      renderer.setMap(map);
 var legs = response.routes[0].legs;
  var i,j,k;
  for (i = 0; i < legs.length; i++) {
    var steps = legs[i].steps;
    for (j = 0; j < steps.length; j++) {
      var nextSegment = steps[j].path;
            var stepPolyline = new google.maps.Polyline(polylineOptions);

      if (steps[j].travel_mode == google.maps.TravelMode.WALKING) {
        stepPolyline.setOptions(walkingPolylineOptions)
      }
      for (k = 0; k < nextSegment.length; k++) {
        stepPolyline.getPath().push(nextSegment[k]);
      }
      stepPolyline.setMap(map);
    }
  }

    } else {
      renderer.setMap(null);
      renderer.setPanel(null);
    }
  });


             }); 
        });
   
        google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

    });



var renderer = new google.maps.DirectionsRenderer({
  suppressPolylines: true,
  polylineOptions: {
    strokeColor: '#C83939',
    strokeOpacity:0,
    strokeWeight: 0,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#C83939',
        scale:3,
        strokeOpacity: 1,
        fillOpacity: 4,
      },
      offset: '0',
      repeat: '15px'
    }]
  }
});
var directions = new google.maps.DirectionsService();
var request = {
    origin: currentPos,
    destination: dest,
    travelMode: google.maps.TravelMode.WALKING,
    provideRouteAlternatives: true,
  };

 // 
        // option renderDirectionsPolylines
 
var walkingPolylineOptions = {
  strokeColor: '#4F66F5',
  strokeOpacity:0,
  strokeWeight:0,
  icons: [{
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#4F66F5',
      fillOpacity: 1,
      scale: 2,
      strokeColor: '#4F66F5',
      strokeOpacity: 1,
    },
    offset: '0',
    repeat: '10px'
  }]
};
         var polylineOptions = {
  strokeColor: '#4F66F5',
  strokeOpacity: 1,
  strokeWeight: 4
};
 

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
