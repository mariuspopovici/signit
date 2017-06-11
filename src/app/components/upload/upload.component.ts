import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/dist';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css']
})

export class UploadComponent implements OnInit {

  // app consts
  public dropzoneConfig: DropzoneConfigInterface;

  constructor() {
    // app consts
    this.dropzoneConfig = {
      server: 'https://httpbin.org/post',
      maxFilesize: 50,
      acceptedFiles: 'image/*,application/pdf,.doc,.docx,.xls,xlsx',
      params: 'directory=images',
      dictDefaultMessage: `<h4>Drop files here or click to start a new document upload</h4>`,
      createImageThumbnails: true
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
