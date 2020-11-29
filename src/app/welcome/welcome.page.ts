import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private platform: Platform,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.platform.ready().then(() => this.obtenerPosicion());
  }


  obtenerPosicion(): any {
    this.geolocation.getCurrentPosition().then(response => {
      console.log(response)
    })
      .catch(error => {
        console.log(error);
	  })
	  

	let watch = this.geolocation.watchPosition();
				watch.subscribe((data) => {
					console.log(data)
				});
  }

}
