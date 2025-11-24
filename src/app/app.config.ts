import { registerLocaleData } from '@angular/common';
import localeEnUS from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

registerLocaleData(localeEs);
registerLocaleData(localeEnUS, 'en-US');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
