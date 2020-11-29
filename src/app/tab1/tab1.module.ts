import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#9d1515",
      "backgroundGradientStopColor": "#7c1818",
      "backgroundOpacity": 0.7,
      "backgroundStrokeWidth": 0,
      "backgroundPadding": 20,
      "radius": 80,
      "space": -22,
      "toFixed": 0,
      "maxPercent": 1000,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 22,
      "outerStrokeColor": "#b7b4db",
      "outerStrokeGradientStopColor": "#8bbde5",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 22,
      "imageHeight": 44,
      "animation": false,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "startFromZero": false})
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
