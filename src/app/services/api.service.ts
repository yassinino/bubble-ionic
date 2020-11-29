import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'https://abeille.app/bubble/public/api/users';
  url = 'https://abeille.app/bubble/public/api/';
  token : any;

  constructor(private http: HttpClient, private nativeStorage : NativeStorage) { }
  httpOptions = {}


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  createItem(item){

    return this.http
      .post<User>(this.base_path, item)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // Get single User data by ID
  getItem(id): Observable<User> {
    return this.http
      .get<User>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUser(){

    this.nativeStorage.getItem('token_bubble')
    .then(
      data => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Authorization': "Bearer " + data.token,
          })
        }
          this.http
            .get<User>(this.url + 'user', httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            )
      },
      error => console.error(error)
    );
  }

  // Get Users data
  getLocalUser(){
    this.nativeStorage.getItem('token_bubble')
    .then(
      data => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Authorization': "Bearer " + data.token,
          })
        }
          this.http
            .get<User>(this.url + 'rankings/local', httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            )
      },
      error => console.error(error)
    );
  }


  getGlobalUser(){
    this.nativeStorage.getItem('token_bubble')
    .then(
      data => {
        let httpOptions = {
          headers: new HttpHeaders({
            'Authorization': "Bearer " + data.token,
          })
        }
          this.http
            .get<User>(this.url + 'rankings/global', httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            )
      },
      error => console.error(error)
    );
  }

  getList(): Observable<User> {
    return this.http
      .get<User>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id, item){
    return this.http
      .put(this.base_path + '/' + id, item)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<User>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  postfile(file){

    let httpOptions = {
        headers: new HttpHeaders({
            'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
        })
    };

    return this.http.post(
            this.url + 'uploadimage',
            file,
            {}
      );
}

  
}
