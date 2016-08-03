"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var transport_data_1 = require('../../providers/transport-data');
var ionic_native_1 = require('ionic-native');
var ionic_angular_1 = require('ionic-angular');
var schedule_filter_1 = require('../schedule-filter/schedule-filter');
var MapPage = (function () {
    function MapPage(transData, nav) {
        this.transData = transData;
        this.nav = nav;
        // filtre
        this.excludeTracks = [];
    }
    MapPage.prototype.ionViewLoaded = function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var mapEle = document.getElementById('map');
        var map = new google.maps.Map(mapEle, {
            zoom: 16
        });
        var dest;
        var currentPos;
        // show map
        this.transData.getMap().then(function (mapData) {
            var currentPosition;
            //current position   
            var markerCurrentPostion = new google.maps.Marker({
                position: map.getCenter(),
                icon: 'img/yourlocation.png',
                map: map,
                animation: google.maps.Animation.DROP,
                title: "I'm here"
            });
            var infowindow = new google.maps.InfoWindow({
                content: "I'm here"
            });
            infowindow.open(map, markerCurrentPostion);
            var options = { timeout: 10000, enableHighAccuracy: true };
            /*
            
            
            autoUpdate();
            */
            ionic_native_1.Geolocation.getCurrentPosition(options).then(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                currentPos = lat + "," + lng;
                currentPosition = new google.maps.LatLng(lat, lng);
                map.setCenter(currentPosition);
                markerCurrentPostion.setPosition(currentPosition);
            }, function (err) {
                console.log('errrrrrrreur');
            });
            var watchId = navigator.geolocation.watchPosition(function (location) {
                var myLatlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
                map.setCenter(myLatlng);
                map.setZoom(15);
                //show current location on map
                markerCurrentPostion.setPosition(myLatlng);
                navigator.geolocation.clearWatch(watchId);
            });
            //  stations markers
            var infoWindow = new google.maps.InfoWindow();
            mapData.forEach(function (markerData) {
                var busstop = {
                    url: 'img/busstop.png',
                };
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(markerData.STOP_LAT, markerData.STOP_LON),
                    icon: busstop,
                    map: map,
                    title: markerData.STOP_NAME
                });
                marker.addListener('click', function () {
                    infoWindow.setContent("<h5>" + markerData.STOP_NAME + "</h5>");
                    infoWindow.open(map, marker);
                    //// trace route
                    dest = markerData.STOP_LAT + "," + markerData.STOP_LON;
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
                    directions.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            renderer.setDirections(response);
                            renderer.setMap(map);
                            var legs = response.routes[0].legs;
                            var i, j, k;
                            for (i = 0; i < legs.length; i++) {
                                var steps = legs[i].steps;
                                for (j = 0; j < steps.length; j++) {
                                    var nextSegment = steps[j].path;
                                    var stepPolyline = new google.maps.Polyline(polylineOptions);
                                    if (steps[j].travel_mode == google.maps.TravelMode.WALKING) {
                                        stepPolyline.setOptions(walkingPolylineOptions);
                                    }
                                    for (k = 0; k < nextSegment.length; k++) {
                                        stepPolyline.getPath().push(nextSegment[k]);
                                    }
                                    stepPolyline.setMap(map);
                                }
                            }
                        }
                        else {
                            renderer.setMap(null);
                            renderer.setPanel(null);
                        }
                    });
                });
            });
            google.maps.event.addListenerOnce(map, 'idle', function () {
                mapEle.classList.add('show-map');
            });
        });
        var renderer = new google.maps.DirectionsRenderer({
            suppressPolylines: true,
            polylineOptions: {
                strokeColor: '#C83939',
                strokeOpacity: 0,
                strokeWeight: 0,
                icons: [{
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: '#C83939',
                            scale: 3,
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
            strokeOpacity: 0,
            strokeWeight: 0,
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
    };
    MapPage.prototype.presentFilter = function () {
        var _this = this;
        var modal = ionic_angular_1.Modal.create(schedule_filter_1.ScheduleFilterPage, this.excludeTracks);
        this.nav.present(modal);
        modal.onDismiss(function (data) {
            if (data) {
                _this.excludeTracks = data;
            }
        });
    };
    //getAddress
    MapPage.prototype.getAddress = function (latitude, longitude) {
        var center = new google.maps.LatLng(latitude, longitude);
        return new Promise(function (resolve, reject) {
            new google.maps.Geocoder().geocode({ 'location': center }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results);
                }
                else {
                    reject(status);
                }
            });
        });
    };
    MapPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/map/map.html'
        }), 
        __metadata('design:paramtypes', [transport_data_1.TransportData, ionic_angular_1.NavController])
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
