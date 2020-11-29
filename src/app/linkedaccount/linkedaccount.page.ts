import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { LoadingController,AlertController, ToastController, Platform } from '@ionic/angular';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { LinkedinService } from '../services/linkedin.service';
import { Facebook } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-linkedaccount',
  templateUrl: './linkedaccount.page.html',
  styleUrls: ['./linkedaccount.page.scss'],
})
export class LinkedaccountPage implements OnInit {
  url = 'https://abeille.app/bubble/public/api/';
  linked : any;
  facebook : any;
  twitter : any;
  linkedin : any;
  constructor(private router: Router,
    private http: HttpClient,
    public modalCtrl: ModalController,
    private nativeStorage : NativeStorage,
    public login : LoginPage,
    public apiTwitter: TwitterConnect,
    public loadingController: LoadingController,
    public linkedinService: LinkedinService,
    private fb: Facebook,

    ) { }

  ngOnInit() {
    this.getLinkedAccount();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async linkAccount(type: any){



    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let values = {
      type : '',
      link : '',
      user  : {}
    };

    values.type = type


    if(type == 1){
      this.facebook = !this.facebook;
      values.link = this.facebook

      if(this.facebook == true){

    
    let permissions = ["public_profile", "email"];
		this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;
			let accessToken = response.authResponse.accessToken;

			let user = {
        id : userId, accessToken : accessToken
      };

          values.user = user;

          this.nativeStorage.getItem('token_bubble')
          .then(
          data => {
            let httpOptions = {
              headers: new HttpHeaders({
                'Authorization': "Bearer " + data.token,
              })
            }
            this.http
                .post(this.url + 'links', values, httpOptions)
                .subscribe(res => {
                  loading.dismiss();
                })
          },
          error => {
            this.router.navigate(["/login"]);
          }
        );


    }, error => {
      this.facebook = false;
    console.log("Error connecting to facebook: ", error);
    });
      }else{

        this.nativeStorage.getItem('token_bubble')
        .then(
        data => {
          let httpOptions = {
            headers: new HttpHeaders({
              'Authorization': "Bearer " + data.token,
            })
          }
          this.http
              .post(this.url + 'links', values, httpOptions)
              .subscribe(res => {
                loading.dismiss();
              })
        },
        error => {
          this.router.navigate(["/login"]);
        }
);
    }
    }

    if(type == 2){
      this.linkedin = !this.linkedin;
      values.link = this.linkedin

      if(this.linkedin == true){

        this.login.linkedInLogin().then(success => { 
					this.linkedinService.getAccessToken(success.code).then(res =>{
						let data = JSON.parse(res.data);
            let access_token = data.access_token
            
						this.linkedinService.getName(access_token).then(res =>{
							
							let user = {
								id : '', accessToken : ''
							};
							user.id = res["id"];
              user.accessToken = access_token;
              
              values.user = user;

            this.nativeStorage.getItem('token_bubble')
            .then(
            data => {
              let httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': "Bearer " + data.token,
                })
              }
              this.http
                  .post(this.url + 'links', values, httpOptions)
                  .subscribe(res => {
                    loading.dismiss();
                  })
            },
            error => {
              this.router.navigate(["/login"]);
            }
          );
	
						});
					}, err =>{
            console.log("error : " + err);
            this.linkedin = false;
            loading.dismiss();

        });
				}).catch(err =>{
            console.log("error : " + err);
            this.linkedin = false;
            loading.dismiss();

        });
      }else{

        this.nativeStorage.getItem('token_bubble')
        .then(
        data => {
          let httpOptions = {
            headers: new HttpHeaders({
              'Authorization': "Bearer " + data.token,
            })
          }
          this.http
              .post(this.url + 'links', values, httpOptions)
              .subscribe(res => {
                loading.dismiss();
              })
        },
        error => {
          this.router.navigate(["/login"]);
        }
);
    }


    }

    if(type == 3){

      this.twitter = !this.twitter;
      values.link = this.twitter


      if(this.twitter == true){


		  this.apiTwitter.login().then( response => {

						let user = {
							id : '', accessToken : ''
						};

						user.id = response.userId
            user.accessToken = response.token
            values.user = user;

            this.nativeStorage.getItem('token_bubble')
            .then(
            data => {
              let httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': "Bearer " + data.token,
                })
              }
              this.http
                  .post(this.url + 'links', values, httpOptions)
                  .subscribe(res => {
                    loading.dismiss();
                  })
            },
            error => {
              this.router.navigate(["/login"]);
            }
          );


		  }, error => {
        this.twitter = false;
      console.log("Error connecting to twitter: ", error);
		  });
      }else{

          this.nativeStorage.getItem('token_bubble')
          .then(
          data => {
            let httpOptions = {
              headers: new HttpHeaders({
                'Authorization': "Bearer " + data.token,
              })
            }
            this.http
                .post(this.url + 'links', values, httpOptions)
                .subscribe(res => {
                  loading.dismiss();
                })
          },
          error => {
            this.router.navigate(["/login"]);
          }
  );
      }
      this.twitter = false;
      loading.dismiss();


    }
    

  }

  getLinkedAccount(){

   this.nativeStorage.getItem('token_bubble')
  .then(
    data => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + data.token,
        })
      }
        this.http
          .get(this.url + 'linked', httpOptions)
          .subscribe(res => {
            this.linked = res
            this.facebook = this.linked[1];
            this.twitter = this.linked[3];
            this.linkedin = this.linked[2];
          })
    },
    error => {
      this.router.navigate(["/login"]);
    }
  );

  }

  async presentLoading(loading) {
		return await loading.present();
	}

}
