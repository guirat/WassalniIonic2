import {Component} from '@angular/core';
import {NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {FavoriteDetailPage} from '../favorite-detail/favorite-detail';
import {SessionDetailPage} from '../session-detail/session-detail';


@Component({
  templateUrl: 'build/pages/favorite-list/favorite-list.html'
})
export class FavoritePage {
  actionSheet: ActionSheet;
  favorites = [];

  constructor(private nav: NavController, confData: ConferenceData) {
    confData.getFavorites().then(favorites => {
      this.favorites = favorites;
    });
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

}
