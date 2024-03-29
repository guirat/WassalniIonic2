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
var ionic_angular_1 = require('ionic-angular');
var transport_data_1 = require('../../providers/transport-data');
var favorite_detail_1 = require('../favorite-detail/favorite-detail');
var session_detail_1 = require('../session-detail/session-detail');
var FavoriteListPage = (function () {
    function FavoriteListPage(nav, transData) {
        var _this = this;
        this.nav = nav;
        this.favorites = [];
        transData.getFavorites().then(function (favorites) {
            _this.favorites = favorites;
        });
    }
    FavoriteListPage.prototype.goToSessionDetail = function (session) {
        this.nav.push(session_detail_1.SessionDetailPage, session);
    };
    FavoriteListPage.prototype.goToFavoriteDetail = function (favoriteName) {
        this.nav.push(favorite_detail_1.FavoriteDetailPage, favoriteName);
    };
    FavoriteListPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/favorite-list/favorite-list.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, transport_data_1.TransportData])
    ], FavoriteListPage);
    return FavoriteListPage;
}());
exports.FavoriteListPage = FavoriteListPage;
