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
// import {Page} from 'ionic-angular';
var conference_data_1 = require('../../providers/conference-data');
var ionic_native_1 = require('ionic-native');
var ionic_angular_1 = require('ionic-angular');
var schedule_filter_1 = require('../schedule-filter/schedule-filter');
var MapPage = (function () {
    function MapPage(confData, nav) {
        this.confData = confData;
        this.nav = nav;
        this.excludeTracks = [];
    }
    MapPage.prototype.ionViewLoaded = function () {
        this.confData.getMap().then(function (mapData) {
            var currentPosition;
            var mapEle = document.getElementById('map');
            var map = new google.maps.Map(mapEle, {
                //center: new google.maps.LatLng(34.7568479,10.712911),
                zoom: 16
            });
            var markerCurrentPostion = new google.maps.Marker({
                position: map.getCenter(),
                icon: 'img/BusStationMarker.png',
                map: map,
                animation: google.maps.Animation.DROP,
                title: "I'm here"
            });
            var infowindow = new google.maps.InfoWindow({
                content: "I'm here"
            });
            infowindow.open(map, markerCurrentPostion);
            var options = { timeout: 10000, enableHighAccuracy: true };
            ionic_native_1.Geolocation.getCurrentPosition(options).then(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                currentPosition = new google.maps.LatLng(lat, lng);
                map.setCenter(currentPosition);
                markerCurrentPostion.setPosition(currentPosition);
            }, function (err) {
                console.log('errrrrrrreur');
            });
            mapData.forEach(function (markerData) {
                var infoWindow = new google.maps.InfoWindow({
                    content: "<h5>" + markerData.STOP_NAME + "</h5>"
                });
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(markerData.STOP_LAT, markerData.STOP_LON),
                    icon: 'img/BusStationMarker.png',
                    map: map,
                    title: markerData.STOP_NAME
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
    MapPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/map/map.html'
        }), 
        __metadata('design:paramtypes', [conference_data_1.ConferenceData, ionic_angular_1.NavController])
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
