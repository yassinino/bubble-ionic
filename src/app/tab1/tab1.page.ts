import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CircleProgressComponent } from 'ng-circle-progress';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public user: any = {};
  url = 'https://abeille.app/bubble/public/api/';
  link = environment.picturePath;

  constructor(private platform: Platform,private http: HttpClient,public apiService: ApiService, private nativeStorage : NativeStorage, private router: Router) {


  }

  ionViewDidEnter() {
    this.getProfile();
  }

  getProfile(){

  this.platform.ready().then(() => {

  this.nativeStorage.getItem('token_bubble')
  .then(
    data => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + data.token,
        })
      }
        this.http
          .get(this.url + 'user', httpOptions)
          .subscribe(res => {
            this.user = res
          })
    },
    error => {
      this.router.navigate(["/login"]);
    }
  );


    });
  }

}
