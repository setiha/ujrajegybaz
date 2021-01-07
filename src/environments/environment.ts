// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    baseUrl: 'https://jegybazar-133bd.firebaseio.com/',
    registrationUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key',
    loginUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key',
    apiKey: 'AIzaSyAuEmr6G2pHf3jU2FWTsuj07PvGERwO0Eo',
    authDomain: 'jegybazar-133bd.firebaseapp.com',
    databaseURL: 'https://jegybazar-133bd.firebaseio.com',
    projectId: 'jegybazar-133bd',
    storageBucket: 'jegybazar-133bd.appspot.com',
    messagingSenderId: '726633883296',
    appId: '1:726633883296:web:df8e7716544d9f6334cbc5',
    measurementId: 'G-VQDZYEXF7V'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
