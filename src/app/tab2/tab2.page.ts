import { Component } from '@angular/core';
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { environment } from "src/environments/environment";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public users: any = [];
  public items: any = [];
  link = environment.picturePath;
  url = 'https://abeille.app/bubble/public/api/';

  current : any = 0;
  currentFetch : any = 0;
  map: GoogleMap;
  constructor(
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform,
    private apiService: ApiService,
    private http: HttpClient,
     private nativeStorage : NativeStorage,
      private router: Router
  ) {
  }

  ngOnInit(){
    this.loadMap()
  }

  ionViewDidEnter() {
    this.fetchLocalUsers();
  }


  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyD__X0l5vSEAwuWFj96xi0HdDrFghGRkEQ',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyD__X0l5vSEAwuWFj96xi0HdDrFghGRkEQ'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 51.5287352,
          lng: -0.3817816
        },
        zoom: 12,
        tilt: 30
      }
    });


    
  }

  choseNetwork(type){
    this.current = type
    if(type == 1){
      this.users = this.items.filter(function(item) {
        return item.score_fb > 0;
       });
    }else if(type == 3){
      this.users = this.items.filter(function(item) {
        return item.score_tw > 0;
       });
    }else if(type == 2){
      this.users = this.items.filter(function(item) {
        return item.score_li > 0;
       });
    }else{
      this.users = this.items;
    }
 
  }

  showProfil(user){
    let navigationExtras: NavigationExtras = {
      state: {
        user: user
      }
    };
    this.router.navigate(['/profile'],navigationExtras);
  }

  fetchLocalUsers(){
    this.currentFetch = 0;

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
            .get(this.url + 'rankings/local', httpOptions)
            .subscribe(res=>{
              this.users = res
              this.items = this.users

              this.setMarker(this.users)
            })
      },
      error => console.error(error)
    );

    });
  }

  setMarker(users){
    var features = [];
    
    this.map.clear();

      for (var i = 0; i < users.length; i++) {
        features[i] = {
          position : { lat : users[i]["latitude"], lng : users[i]["longtitude"]}
        }
      }


      for (var i = 0; i < features.length; i++) {

        let marker: Marker = this.map.addMarkerSync({
          icon: {  url: "./assets/icons/mark.png",
            size: {
                  width: 30,
                  height: 40
              }
            },
          position: features[i].position
      });

      marker.setPosition(features[i].position)


      }

  }


  fetchGlobalUsers(){
    this.currentFetch = 1;

    this.nativeStorage.getItem('token_bubble')
    .then(
      data => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Authorization': "Bearer " + data.token,
          })
        }
          this.http
            .get(this.url + 'rankings/global', httpOptions)
            .subscribe(res=>{
              this.users = res
              this.items = this.users
              this.setMarker(this.users)
            })
      },
      error => console.error(error)
    );
  }

}
