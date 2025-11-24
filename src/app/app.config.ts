import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
<<<<<<< HEAD
=======
import { provideStorage, getStorage } from '@angular/fire/storage';
>>>>>>> 30b74b6 (SIGNUP and LOGIN (all working), firbase)

import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
<<<<<<< HEAD
    provideAuth(() => getAuth()) 
=======
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
>>>>>>> 30b74b6 (SIGNUP and LOGIN (all working), firbase)
  ]
}; 
