import { Component, OnInit, EventEmitter } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { ProfileService } from '../../services/profile.service';
import { Input, Output, AfterContentInit, ContentChild,AfterViewInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css']
})

export class GroupsComponent implements OnInit {
    // init groups in an empty array
    groups: any = [
        {
            groupName: 'SDD Reviewers',
            groupMembers: ['Michael', 'Sonia']
        },
        {
            groupName: 'SAD Reviewers',
            groupMembers: ['Alin', 'Ryan']
        }
    ];

    users: string [] = ['Mirela', 'Alin', 'Ioana', 'Sonia', 'Ryan'];

    userFilter: any;
    showSearch: boolean;
    focusSettingEventEmitter = new EventEmitter<boolean>();

    constructor(private groupsService: GroupsService, private profileService: ProfileService) { }

    ngOnInit() {
        this.userFilter = '';
        this.showSearch = false;
        // this.groupsService.getAllGroups().subscribe(groups => {
        //     this.groups = groups;
        // });

        // this.profileService.getAllProfiles().subscribe(profiles => {
        //     profiles.forEach(userProfile => {
        //         this.users.push(userProfile.full_name);
        //     });
        // });
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
        if (this.showSearch) {
            this.setFocus();
        }
    }

    setFocus(): void {
        this.focusSettingEventEmitter.emit(true);
        console.log('setting focus!');
    }
}
