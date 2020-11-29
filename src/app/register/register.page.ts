import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController,AlertController, ToastController, Platform } from '@ionic/angular';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';

import { LinkedinService } from '../services/linkedin.service';
import { Router } from '@angular/router';
import { HTTP } from "@ionic-native/http/ngx";
import { RequestOptions } from "@angular/http";
import { Network } from '@ionic-native/network/ngx';
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
declare var window: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  FB_APP_ID: number = 269795484267326;
  data: User
  oauth_consumer_key = "lDdircdSYbLhvtv9dKqb2aWsY";
  oauth_signature_method = "HMAC-SHA1";

  
  constructor(
		private fb: Facebook,
		private nativeStorage: NativeStorage,
		public loadingController: LoadingController,
		private router: Router,
		private platform: Platform,
   		public alertController: AlertController,
    	public apiService: ApiService,
		public linkedinService: LinkedinService,
		private http: HttpClient,
		private network: Network,
		private toastCtrl: ToastController,
		private iab: InAppBrowser,
		private twitter: TwitterConnect
		    ) {
	  this.data = new User();
	  

     }


  ngOnInit() {
  }

  async FacebookLogin(){
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);

		//the permissions your facebook app needs from the user
    let permissions = ["public_profile", "email"];
		this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;
			let accessToken = response.authResponse.accessToken;

			

			//Getting name and gender properties
			this.fb.api("/me?fields=name,email", permissions)
			.then(user =>{
				user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
				user.accessToken = accessToken;
				user.type_network = 1;

				this.apiService.createItem(user).subscribe((response) => {
					this.nativeStorage.setItem('token_bubble',
					{
						token: response.access_token,
					})
					.then(() =>{
						this.router.navigate(["/tabs/tab1"]);
						loading.dismiss();
					}, error =>{
						console.log(error);
						loading.dismiss();
					})
				});
			})
		}, error =>{
			console.log(error);
			loading.dismiss();
		});
	}

	async TwitLogin(){

		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);

		this.twitter.login().then( response => {

						let user = {
							name : '', id : '', accessToken : '', picture : '', email : '', type_network : 0,
						};

						user.name = response.userName
						user.id = response.userId
						user.accessToken = response.token
						user.type_network = 3

						this.apiService.createItem(user).subscribe((response) => {
							this.nativeStorage.setItem('token_bubble',
							{
								token: response.access_token,
							})
							.then(() =>{
								this.router.navigate(["/tabs/tab1"]);
								loading.dismiss();
							}, error =>{
								console.log(error);
								loading.dismiss();
							})
						});

		  }, error => {
			console.log("Error connecting to twitter: ", error);
		  });

		
	}



	public linkedInLogin(): Promise<any> {

		let state = this.linkedinService.getRandomState();

		return new Promise((resolve, reject) => {
			var url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77p28ld1tnvlwv&redirect_uri=http://localhost:8100/callback&state="+state+"&scope=r_liteprofile%20r_emailaddress%20w_member_social";

			let browser = this.iab.create(url, '_blank');
		 
			let listener = browser.on('loadstart').subscribe((event: any) => {
		 
			  //Check the redirect uri
			  if((event.url).indexOf('http://localhost:8100/callback') === 0 ){
				listener.unsubscribe();
				browser.close();
				var parsedResponse = {};
					var code = (event.url.split("=")[1]).split("&")[0];
					var state = event.url.split("=")[2];
					if (code !== undefined && state !== null) {
						parsedResponse["code"] = code;
						resolve(parsedResponse);
					} else {
						reject("Problem authenticating with LinkedIn");
					}
			  }
		 
			});
		 
		  });

	}
	async linkLogin() {
			const loading = await this.loadingController.create({
				message: 'Please wait...'
			});
			this.presentLoading(loading);

				this.linkedInLogin().then(success => { 
					this.linkedinService.getAccessToken(success.code).then(res =>{
						let data = JSON.parse(res.data);
						let access_token = data.access_token
						this.linkedinService.getName(access_token).then(res =>{
							
							let user = {
								location : '', name : '', id : '', accessToken : '',picture : '', email : '', type_network : 0,
							};
							user.name = res["localizedFirstName"] + " " + res["localizedLastName"];
							user.id = res["id"];
							user.accessToken = access_token;
							user.type_network = 2;
							this.linkedinService.getEmail(access_token).then(res =>{
								user.email = res['emailAddress'];
							});
							
							

							this.linkedinService.getProfilePic(access_token).then(res =>{
								user.picture = res['identifier'];
							});
							this.apiService.createItem(user).subscribe((response) => {

								this.nativeStorage.setItem('token_bubble',
								{
									token: response.access_token,
								})
								.then(() =>{
									this.router.navigate(["/tabs/tab1"]);
									loading.dismiss();
								}, error =>{
									console.log(error);
									loading.dismiss();
								})
							});
	
						});
					});
				}, (error) => {
					console.log("error : " + error);
				});
			
	}


	async presentLoading(loading) {
		return await loading.present();
	}


}
