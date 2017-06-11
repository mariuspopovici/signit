import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/dist';
import { GroupsService } from '../../services/groups.service';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css']
})

export class UploadComponent implements OnInit {

  public dropzoneConfig: DropzoneConfigInterface;
  public tags: Recipient [];
  public autoCompleteTags: Recipient [];
  private allReviewers: Map<string, Recipient>;

  constructor(private groupsService: GroupsService, private profileService: ProfileService) {
    // app consts
    this.dropzoneConfig = {
      server: 'https://httpbin.org/post',
      maxFilesize: 50,
      acceptedFiles: 'image/*,application/pdf,.doc,.docx,.xls,xlsx',
      params: 'directory=images',
      dictDefaultMessage: `<h4>Drop files here or click to start a new document upload</h4>`,
      createImageThumbnails: true
    };

    this.allReviewers = new Map();
    this.tags = [];
    this.autoCompleteTags = [];
  }

  ngOnInit() {
    // this.groupsService.getAllGroups().subscribe(groups => {
    //   groups.forEach(group => {
    //     if (!this.allReviewers.has(group.groupName)) {
    //       this.allReviewers.set(group.groupName, {
    //         name: group.groupName,
    //         type: 'group',
    //         id: group.groupName
    //       });
    //     }
    //   })
    // });

    this.profileService.getAllProfiles().subscribe(profiles => {
      profiles.forEach(userProfile => {
        const reviewer: Recipient = {
          name: userProfile.full_name,
          type: 'user',
          id: userProfile.email
        };

        if (!this.allReviewers.has(userProfile.email)) {
          this.allReviewers.set(userProfile.email, reviewer);
          this.autoCompleteTags.push(reviewer);
        }
      });
    });

    console.log(this.tags);
  }

  onUploadError(e) {
    console.log(e);
  }

  onUploadSuccess(event) {
    console.log(event);
  }
}

export interface Recipient {
    name: string;
    type: string;
    id: string;
}
