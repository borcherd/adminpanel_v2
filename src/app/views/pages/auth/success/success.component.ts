import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'ngx-success',
  styleUrls: ['./success.component.scss'],
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

}

