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
var MapPage = (function () {
    function MapPage(confData) {
        this.confData = confData;
    }
    MapPage.prototype.ionViewLoaded = function () {
        this.confData.getMap().then(function (mapData) {
            var mapEle = document.getElementById('map');
            var map = new google.maps.Map(mapEle, {
                zoom: 16
            });
            var options = { timeout: 10000, enableHighAccuracy: true };
            ionic_native_1.Geolocation.getCurrentPosition(options).then(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                map.setCenter(new google.maps.LatLng(lat, lng));
            }, function (err) {
                console.log('errrrrrrreur');
            });
            mapData.forEach(function (markerData) {
                var infoWindow = new google.maps.InfoWindow({
                    content: "<h5>" + markerData.name + "</h5>"
                });
                var marker = new google.maps.Marker({
                    position: markerData,
                    icon: 'img/BusStationMarker.png',
                    map: map,
                    title: markerData.name
                });
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
            });
            google.maps.event.addListenerOnce(map, 'idle', function () {
                mapEle.classList.add('show-map');
            });
        });
    };
    MapPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/map/map.html'
        }), 
        __metadata('design:paramtypes', [transport_data_1.TransportData])
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
