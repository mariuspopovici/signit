import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupsService {
    constructor(private http: Http) { }

    // get all groups from the REST API
    getAllGroups() {
        return this.http.get('/api/groups').map(res => res.json());
    }
}