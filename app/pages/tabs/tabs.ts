import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {SchedulePage} from '../schedule/schedule';
import {FavoritePage} from '../favorite/favorite';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = FavoritePage;
  tab3Root: any = MapPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
