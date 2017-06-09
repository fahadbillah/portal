import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-root',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  location: Location;

  familyMember = {};
  familyMembers = [];

  personalInfo = {
    name: 'Fahad Billah',
    age: 30,
    email: 'fahadbillah@yahoo.com',
  };

  constructor(location: Location) { this.location = location; }

  ngOnInit() {
  }

  myEvent(event) {
    console.log(event);
  }

  familyMemberSubmit(familyMemberForm) {
    console.log('test')
    console.log(familyMemberForm)
    this.familyMembers.push(familyMemberForm);
  }
}
