import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/dist';
import { GroupsService } from '../../services/groups.service';
import { ProfileService } from '../../services/profile.service';
import { ViewChild} from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css'],
})

export class UploadComponent implements OnInit {

  public dropzoneConfig: DropzoneConfigInterface;
  public tags: Recipient [];
  public autoCompleteTags: Recipient [];

  @ViewChild('tagInput') tagInputElement: any;

  constructor(private groupsService: GroupsService, private profileService: ProfileService) {
    // app consts
    this.dropzoneConfig = {
      server: 'https://httpbin.org/post',
      maxFilesize: 50,
      acceptedFiles: 'image/*,application/pdf,.doc,.docx,.xls,xlsx',
      params: 'directory=images',
      dictDefaultMessage: `<h4>Start by dropping a file here or click to start a new document upload.</h4>`,
      createImageThumbnails: true
    };

    this.tags = [];
    this.autoCompleteTags = [];
  }

  ngOnInit() {
    this.groupsService.getAllGroups().subscribe(groups => {
      groups.forEach(group => {
        const reviewGroup: Recipient = {
            name: group.groupName,
            type: 'group',
            id: group.groupName
        };
        this.autoCompleteTags.push(reviewGroup);
      })
    });

    this.profileService.getAllProfiles().subscribe(profiles => {
      profiles.forEach(userProfile => {
        const reviewer: Recipient = {
          name: userProfile.full_name,
          type: 'user',
          id: userProfile.email
        };
        this.autoCompleteTags.push(reviewer);
      });
    });

  }

  onUploadError(e) {
    console.log(e);
  }

  onUploadSuccess(e) {
    // focus on reviewer input box
    setTimeout(() => {
      this.tagInputElement.focus(true);
    });
  }

  onAddReviewer(event) {
    console.log(event);
  }

  onRemoveReviewer(event) {
    console.log(event);
  }
}

export interface Recipient {
    name: string;
    type: string;
    id: string;
}
