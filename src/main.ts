import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from "@angular/core";

// TODO: Don't forget to enable prodMode!
// enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
