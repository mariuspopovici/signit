import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';

@Component({
    selector: 'app-groups',
    templateUrl: 'groups.component.html'
})

export class GroupsComponent implements OnInit {
    // init groups in an empty array
    groups: any = [];
    users: Array<string> = ['Sugar Ray Robinson', 'Muhammad Ali', 'George Foreman',
        'Joe Frazier', 'Jake LaMotta', 'Joe Louis', 'Jack Dempsey', 'Rocky Marciano',
        'Mike Tyson', 'Oscar De La Hoya'];
    constructor(private groupsService: GroupsService) { }

    ngOnInit() {
        this.groupsService.getAllGroups().subscribe(groups => {
            this.groups = groups;
        });
    }
}
