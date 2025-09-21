import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ⬇️ Import helpers for providers
import { importProvidersFrom } from '@angular/core';
// ⬇️ Import HttpClientModule for API calls
import { HttpClientModule } from '@angular/common/http';

// ⬇️ Register HttpClientModule inside providers
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule)  // ✅ Added
  ]
}).catch((err) => console.error(err));
