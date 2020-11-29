import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from "@ionic-native/http/ngx";
import { RequestOptions } from "@angular/http";
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LoginPage } from './login/login.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { GoogleMaps } from '@ionic-native/google-maps'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [
    GoogleMaps,
    WebView,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    Geolocation,
    HTTP,
    StatusBar,
    SplashScreen,
    Facebook,
    Network,
    Dialogs,
    NativeStorage,
    Base64,
    InAppBrowser,
    TwitterConnect,
    ImagePicker,
    MediaCapture,
    File,
    Media,
    StreamingMedia,
    PhotoViewer,
    LoginPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy
}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
