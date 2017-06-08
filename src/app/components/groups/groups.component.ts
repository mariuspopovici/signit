
import { Component, OnInit, EventEmitter } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { ProfileService } from '../../services/profile.service';
import { Input, Output, AfterContentInit, ContentChild, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * Groups component. Allow user to create and organize review / sign groups.
 * User drags and drop group members from the global user list to groups,
 * can add new groups and edit / delete existing ones.
 */
@Component({
  moduleId: module.id,
  selector: 'app-groups',
  templateUrl: 'groups.component.html',
  styleUrls: ['groups.component.css']
})

export class GroupsComponent implements OnInit {
  // init groups in an empty array
  groups: any[];
  users: any[];
  userFilter: any;
  showSearch: boolean;
  newGroupName: string;
  hoverMembers: { [key: string]: string; } = {};

  // init an event emitter to set focus to specific input fields
  focusSettingEventEmitter = new EventEmitter<boolean>();

  constructor(private groupsService: GroupsService, private profileService: ProfileService) { }


  ngOnInit() {
    this.userFilter = '';
    this.showSearch = false;
    this.users = [];
    this.newGroupName = '';
    this.groupsService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });

    this.profileService.getAllProfiles().subscribe(profiles => {
      profiles.forEach(userProfile => {
        this.users.push(userProfile.full_name);
      });
    });
  }

  /**
   * Toggle user list search box visibility.
   */
  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      // set focus after execution ends and browser gets a chance to update UI
      // and make the search field visible
      setTimeout(() => {
        this.setFocus();
      });
    }
  }

  setFocus(): void {
    this.focusSettingEventEmitter.emit(true);
  }

  /**
   * Toggle edit mode for selected user group.
   * @param group the selected user group
   */
  toggleGroupEdit(group) {
    group.isInEditMode = group.isInEditMode ? false : true;
    // save current value of group mode in case user will cancel edit
    group.previousGroupName = group.groupName;

    if (group.isInEditMode) {
      // once edit text box becomes visible focus on it
      setTimeout(() => {
        this.setFocus();
      });
    }
  }

  /**
   * Save changes to group name.
   * @param group the selected user group
   * @param form reference to group edit form
   */
  saveGroup(group, form: NgForm) {
    if (form.value) {
      group.groupName = form.value.groupName;
      this.groupsService.saveGroup(group).subscribe((data) => {
        // if successful then leave edit mode
        this.toggleGroupEdit(group);
      }, (err) => {
        console.error('Error saving group.', err);
      });
    }
  }

  /**
   * Save changes to group.
   * @param group the selected user group
   * @param form reference to group edit form
   */
  private _saveGroup(group) {
    return this.groupsService.saveGroup(group).subscribe((data) => { }, (err) => {
      console.error('Error saving group.', err);
    });
  }

  /**
   * Cancel edit group and revert to previous value.
   * @param group selected user group
   */
  cancelGroupEdit(group) {
    group.groupName = group.previousGroupName;
    this.toggleGroupEdit(group);
  }

  /**
   * On drop handler.
   */
  onDrop(e: any, group: any) {
    let groupName = e.dragData;
    if (group.groupMembers.indexOf(groupName) < 0) {
      group.groupMembers.push(e.dragData);
    }
    this._saveGroup(group);
  }

  /**
   * On drag end handler.
   */
  onDragEnd(e: any, member: any, group: any) {
    group.groupMembers = group.groupMembers.filter(function (e) {
      return group.groupMembers.indexOf(e) === group.groupMembers.lastIndexOf(e);
    });
    group.groupMembers.splice(group.groupMembers.indexOf(member), 1);
    this._saveGroup(group);
  }

  /**
   * Create new group.
   */
  createNewGroup(form: NgForm) {
    if (form.value) {
      let group = {
        groupName: form.value.inputGroupName,
        groupMembers: []
      };
      this.groupsService.addGroup(group).subscribe((data) => {
        this.groups.push(data);
        this.newGroupName = null;
      }, (err) => {
        console.error('Error adding group.', err);
      });
    }
  }

  /**
   * createGroupModal onShown() handler.
   */
  onCreateGroupModalShown() {
    // set focus in the text input
    setTimeout(() => {
      this.setFocus();
    });
  }
}
