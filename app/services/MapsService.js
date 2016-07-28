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
var MapsService = (function () {
    function MapsService() {
    }
    /**
    * Create a map
    * @elementId
    */
    MapsService.prototype.getMap = function (elementId) {
        return new google.maps.Map(document.getElementById(elementId), {
            zoom: 12,
            center: this._getLatLng(44.8462488, -0.5765077),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    };
    /**
    * Move to position
    */
    MapsService.prototype.moveToPosition = function (map, latitude, longitude) {
        var center = this._getLatLng(latitude, longitude);
        map.setCenter(center);
        this._addMarker(center, map);
    };
    /**
    * Get address from position
    */
    MapsService.prototype.getAddress = function (latitude, longitude) {
        var center = this._getLatLng(latitude, longitude);
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
    /**
    * Add a marker on map
    */
    MapsService.prototype._addMarker = function (position, map) {
        var marker = new google.maps.Marker({
            position: position,
            title: 'Location',
            animation: google.maps.Animation.DROP,
            dragable: true
        });
        marker.setMap(map);
    };
    /**
    * Generate LatLng
    */
    MapsService.prototype._getLatLng = function (latitude, longitude) {
        return new google.maps.LatLng(latitude, longitude);
    };
    MapsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapsService);
    return MapsService;
}());
exports.MapsService = MapsService;
