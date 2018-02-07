import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {StoresModule} from './stores/stores.module';
import {StatsComponent} from './statistics/stats.component';
import {ChartsModule} from 'ng2-charts';
import {AngularFireModule} from 'angularfire2';


export const config = {
  apiKey: 'AIzaSyApu-WfRY0Bv63Zqu836gqbpT0xyGKJHb0',
  authDomain: 'recipewebapp-4a3c3.firebaseapp.com',
  databaseURL: 'https://recipewebapp-4a3c3.firebaseio.com',
  projectId : 'recipewebapp-4a3c3',
  storageBucket: 'recipewebapp-4a3c3.appspot.com',
  messagingSenderId: '305160298994'
};


export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyApu-WfRY0Bv63Zqu836gqbpT0xyGKJHb0',
    authDomain: 'recipewebapp-4a3c3.firebaseapp.com',
    databaseURL: 'https://recipewebapp-4a3c3.firebaseio.com',
    projectId : 'recipewebapp-4a3c3',
    storageBucket: 'recipewebapp-4a3c3.appspot.com',
    messagingSenderId: '305160298994'
  }
}



import {AngularFirestoreModule} from 'angularfire2/firestore';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoresModule,
    ChartsModule,
    AngularFireModule.initializeApp(null),
    AngularFirestoreModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
