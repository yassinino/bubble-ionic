import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { environment } from "src/environments/environment";



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public users: any = [];
  public items: any = [];
  public searchTerm: string = "";
  link = environment.picturePath;

  constructor(public apiService: ApiService,
    private router: Router) {
    
  }

  ionViewDidEnter() {
    this.setFilteredItems();
    this.fetchUsers();
  }

  fetchUsers(){
    this.apiService.getList().subscribe((response) => {
      this.users = response
      this.items = this.users
    });
  }

  setFilteredItems() {
    if (this.searchTerm === undefined || this.searchTerm == "") this.users = this.items;
      this.users = this.items.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  showProfil(user){
    let navigationExtras: NavigationExtras = {
      state: {
        user: user
      }
    };
    this.router.navigate(['/profile'],navigationExtras);
  }

}
