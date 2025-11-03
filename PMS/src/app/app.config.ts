import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * ✅ Application-wide configuration
 * - Enables efficient change detection
 * - Provides routing
 * - Provides HttpClient globally (replaces HttpClientModule)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())  // ✅ Enables HttpClient globally
  ]
};
