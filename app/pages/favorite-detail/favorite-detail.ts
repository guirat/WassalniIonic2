import {Component} from '@angular/core';
import {NavController, NavParams, Page} from 'ionic-angular';
import {SessionDetailPage} from '../session-detail/session-detail';


@Component({
  templateUrl: 'build/pages/favorite-detail/favorite-detail.html'
})
export class FavoriteDetailPage {
  favorite: any;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.favorite = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }
}
