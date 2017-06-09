import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper/dist';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html'
})

export class UploadComponent implements OnInit {

  // app consts
  public dropzoneConfig: DropzoneConfigInterface;

  constructor() {
    // app consts
    this.dropzoneConfig = {
      server: '/api/fileupload',
      maxFilesize: 50,
      acceptedFiles: 'image/*'
    };
  }

  ngOnInit() { }

  onUploadError(e) {
    console.log(e);
  }

  onUploadSuccess(event) {
    console.log(event);
  }

}
