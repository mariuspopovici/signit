import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'toolbar',
    templateUrl: 'toolbar.component.html'
})

export class ToolbarComponent implements OnInit {
    constructor(public auth: Auth) { }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }

    ngOnInit() { }
}
