import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { environment } from "src/environments/environment";
import { Base64 } from '@ionic-native/base64/ngx';


const MEDIA_FOLDER_NAME = 'bubble';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  public onForm: FormGroup;
  link = environment.picturePath;
  data: any = {
    uuid : '',
    name : '',
    email : '',
    about : '',
    profile : ''
  };
  files = [];
  constructor(
        private camera: Camera,
        private base64: Base64,
        private route: ActivatedRoute,
        private router: Router,
        formBuilder: FormBuilder,
        public apiService: ApiService,
        private imagePicker: ImagePicker,
        private mediaCapture: MediaCapture,
        private file: File,
        private media: Media,
        private photoViewer: PhotoViewer,
        private actionSheetController: ActionSheetController,
        private plt: Platform,
        private webview: WebView,
        private DomSanitizer: DomSanitizer) {
        this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
    });

    this.onForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      about: ['', Validators.required],
    });
    
  }

  ngOnInit() {

    this.onForm.setValue({
      name: this.data.name,
      email: this.data.email,
      about: this.data.about,
    });

    
  }

  cancelPage(){
    this.router.navigate(['/tabs/tab4']);
  }



  async onFormSubmit(){
    
    this.apiService.updateItem(this.data.uuid, this.onForm.value).subscribe((response) => {
      let navigationExtras: NavigationExtras = {
        state: {
          user: response
        }
      };
      this.router.navigate(['/tabs/tab4'],navigationExtras);
    })
  }

  async selectMedia() {
    const actionSheet = await this.actionSheetController.create({
      header: 'What would you like to add?',
      buttons: [
        {
          text: 'Capture Image',
          handler: () => {
            this.captureImage();
          }
        },
        {
          text: 'Load Image',
          handler: () => {
            this.pickImage();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
 
  async pickImage() {

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {


     this.data.profile = this.webview.convertFileSrc(imageData);
     
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.base64.encodeFile(imageData).then((base64File: string) => {
     var blob = this.convertBase64ToBlob(base64File)

     var fd = new FormData();
     fd.append('uuid', this.data.uuid);
     fd.append('file', blob);

     this.apiService.postfile(fd).subscribe(res => {
        
      })
    }, (err) => {
      console.log(err);
    });

    }, (err) => {
     // Handle error
    });
    
  }

  convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');
  
    // Hold the content type
    const imageType = parts[0].split(':')[1];
  
    // Decode Base64 string
    const decodedData = atob(parts[1]);
  
    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
  
    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
  
    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

 
  captureImage() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.data.profile = this.webview.convertFileSrc(imageData);
     
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.base64.encodeFile(imageData).then((base64File: string) => {
     var blob = this.convertBase64ToBlob(base64File)

     var fd = new FormData();
     fd.append('uuid', this.data.uuid);
     fd.append('file', blob);

     this.apiService.postfile(fd).subscribe(res => {
        
      })
    }, (err) => {
      console.log(err);
    });
    
    }, (err) => {
     // Handle error
    });

    // this.mediaCapture.captureImage().then(
    //   (data: MediaFile[]) => {
    //     if (data.length > 0) {
    //       let image = data[0]
        
    //       let filePath: string = image.fullPath;
          
          
    //       this.data.profile = this.webview.convertFileSrc(filePath);
    //       this.base64.encodeFile(filePath).then((base64File: string) => {
    //         var blob = this.convertBase64ToBlob(base64File)

    //         var fd = new FormData();
    //         fd.append('uuid', this.data.uuid);
    //         fd.append('file', blob);
    
    //         this.apiService.postfile(fd).subscribe(res => {
              
    //         })
    //       }, (err) => {
    //         console.log(err);
    //       });



    //     }
    //   },
    //   (err: CaptureError) => console.error(err)
    // );
  }
 
 
  openFile(f: FileEntry, name) {
    this.photoViewer.show(f.nativeURL, name);
  }
 

}
