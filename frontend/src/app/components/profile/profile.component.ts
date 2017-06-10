import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  location: Location;
  http: Http;

  familyMember = {};
  familyMembers = [];

  personalInfo = {
    name: 'Fahad Billah',
    age: 30,
    email: 'fahadbillah@yahoo.com',
  };

  constructor(location: Location, http: Http) {
    this.location = location; 
    this.http = http; 
  }

  ngOnInit() {
  }

  myEvent(event) {
    console.log(event);
    this.http.get('http://max-portal.app/api/employee/593bca6b7b7e0f4ec6b21e6b')
    .map((res: Response) => {
      console.log(res.json());
    });
  }

  familyMemberSubmit(familyMemberForm) {
    console.log('test')
    console.log(familyMemberForm)
    this.familyMembers.push(familyMemberForm);
  }

  /*getUsers(){
    return this.http.get('http://max-portal.app/api/employee/593bca6b7b7e0f4ec6b21e6b')
    .map((res: Response) => {
      console.log(res.json());
    });
  }*/
}
