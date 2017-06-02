import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {
    headers: Headers;
    options: RequestOptions;
    url = '/api/userprofiles/';

    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public syncProfile(profile: any) {
        return this.http.put(this.url + profile.name, JSON.stringify(profile), this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public getAllProfiles() {
        return this.http.get(this.url)
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
