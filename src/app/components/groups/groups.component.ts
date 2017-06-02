import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { ProfileService } from '../../services/profile.service';


@Component({
    moduleId: module.id,
    selector: 'app-groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css']
})

export class GroupsComponent implements OnInit {
    // init groups in an empty array
    groups: any = [];
    users: Array<string> = [];
    constructor(private groupsService: GroupsService, private profileService: ProfileService) { }

    ngOnInit() {
        this.groupsService.getAllGroups().subscribe(groups => {
            this.groups = groups;
        });

        this.profileService.getAllProfiles().subscribe(profiles => {
            profiles.forEach(userProfile => {
                this.users.push(userProfile.full_name);
            });
        });
    }
}
