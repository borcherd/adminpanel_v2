import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/logout';
  }

}
