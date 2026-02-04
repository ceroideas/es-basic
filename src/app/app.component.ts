import { Component } from '@angular/core';

import { register } from 'swiper/element/bundle';

import {TranslateService} from '@ngx-translate/core';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(translate: TranslateService,) {

    let lang = localStorage.getItem('language');

    if (!lang) {
        lang = "es";
    }

    translate.setDefaultLang(lang);
    translate.use(lang);
  }
}
