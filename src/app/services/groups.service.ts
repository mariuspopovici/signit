import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GroupsService {

    headers: Headers;
    options: RequestOptions;
    url: string;

    constructor(private http: Http) {
        this.url = '/api/groups/';
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    // get all groups from the REST API
    getAllGroups() {
        return this.http.get(this.url).map(res => res.json());
    }

    // save group
    saveGroup(group) {
        return this.http.put(this.url + group._id, JSON.stringify(group), this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    addGroup(group) {
        return this.http.post(this.url, JSON.stringify(group), this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
