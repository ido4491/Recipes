import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from "angularfire2/database";




@NgModule({
  declarations: [
    DropdownDirective,
  ],
  imports: [
    AngularFireDatabaseModule
  ],
  exports: [
    CommonModule,
    DropdownDirective,
  ]
})
export class SharedModule {

}
