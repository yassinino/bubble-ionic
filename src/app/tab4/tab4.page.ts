import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LinkedaccountPage } from '../linkedaccount/linkedaccount.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  public user: any = {};
  link = environment.picturePath;

  url = 'https://abeille.app/bubble/public/api/';
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private nativeStorage : NativeStorage,
    public apiService: ApiService,
    private platform: Platform,
    private router: Router,
    public modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }

    });
      
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: LinkedaccountPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  editProfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/editprofile'],navigationExtras);
  }

}
