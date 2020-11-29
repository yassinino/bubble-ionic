import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkedaccountPageRoutingModule } from './linkedaccount-routing.module';

import { LinkedaccountPage } from './linkedaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkedaccountPageRoutingModule
  ],
  declarations: [LinkedaccountPage]
})
export class LinkedaccountPageModule {}
