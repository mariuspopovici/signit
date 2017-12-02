import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/dist';
import { GroupsService } from '../../services/groups.service';
import { ProfileService } from '../../services/profile.service';
import { ViewChild} from '@angular/core';
import { SortableComponent } from 'ngx-bootstrap/sortable';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css'],
})

export class UploadComponent implements OnInit {

  public dropzoneConfig: DropzoneConfigInterface;
  public tags: any [];
  public autoCompleteTags: Recipient [];
  public fileUploaded: boolean;

  @ViewChild(SortableComponent) sortableComponent: SortableComponent;
  @ViewChild('tagInput') tagInputElement: any;

  public itemObjectsLeft: any[] = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' }
    ];

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
    this.fileUploaded = false;
  }

  ngOnInit() {
    this.groupsService.getAllGroups().subscribe(groups => {
      groups.forEach(group => {
        const reviewGroup: Recipient = {
            name: group.groupName,
            type: 'group',
            id: group._id,
            picture: '',
            members: group.groupMembers
        };
        this.autoCompleteTags.push(reviewGroup);
      })
    });

    this.profileService.getAllProfiles().subscribe(profiles => {
      profiles.forEach(userProfile => {
        const reviewer: Recipient = {
          name: userProfile.full_name,
          type: 'user',
          id: userProfile.email,
          picture: userProfile.picture ? userProfile.picture : '',
          members: [userProfile]
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
    this.fileUploaded = true;
    setTimeout(() => {
      this.tagInputElement.focus(true);
    });
  }

  onAddReviewer(reviewer) {
    this.tags.push(reviewer);
    this.sortableComponent.writeValue(this.tags);
  }

  onRemoveReviewer(reviewer) {
    const removeIndex = this.tags.map(function(item) { return item.id; }).indexOf(reviewer.id);
    this.tags.splice(removeIndex, 1);
    this.sortableComponent.writeValue(this.tags);
  }
}

export interface Recipient {
    name: string;
    type: string;
    id: string;
    picture: string;
    members: any [];
}
