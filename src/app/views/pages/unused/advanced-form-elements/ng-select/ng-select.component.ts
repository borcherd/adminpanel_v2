import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';


@Component({
  selector: 'app-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss']
})
export class NgSelectComponent implements OnInit {

  simpleItems = [];
  selectedSimpleItem: any = null;

  people: Person[] = [];
  selectedPersonId: string = null;

  selectedSearchPersonId: string = null;

  selectedPeople: any = null;

  groupedMultiSelectedPeople: any = null;

  customTemplateSelectedPeople: any = null;

  constructor() { }

  ngOnInit(): void {

    // simple array
    this.simpleItems = [true, 'Two', 3];

  }

}
