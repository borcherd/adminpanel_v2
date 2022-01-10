import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
<<<<<<< Updated upstream:src/app/views/pages/tables/data-table/data-table.component.ts
=======
import { Person } from 'src/app/models/person';
import { company } from 'src/app/views/constants';
import { DataTable } from "simple-datatables";
import { Subject, Subscription } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
>>>>>>> Stashed changes:src/app/views/pages/tables/admin-panel/admin-panel.component.ts

import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  
  form: FormGroup;
  persons: Person[];
  dtTrigger = new Subject();
  private subscription: Subscription = new Subscription();


  constructor(private personService: PersonService) { 

  }

  ngOnInit(): void {
    this.initaliseForm();
    this.getAllPersons();
    const dataTable = new DataTable("#dataTableExample");
  }

  /**
   * opens a new event (filebrowser)
   * @param event 
   */
  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click()
  }

  /**
   * handles the filebrowser input
   * @param event 
   */
  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
    }
  }

  /**
   * when submitting a new person
   */
  onSubmit(){
      console.log(this.form)
  }

  /**
   * initialises forms to be used in html
   */
  initaliseForm(){
    this.form = new FormGroup({
      Naam: new FormControl('',Validators.required),
      Voornaam: new FormControl('',Validators.required),
      Email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      GsmNummer: new FormControl('',Validators.required),
      Rol: new FormControl('',Validators.required)
    });
  }
<<<<<<< Updated upstream:src/app/views/pages/tables/data-table/data-table.component.ts
=======

  getAllPersons() {
    this.subscription.add(this.personService.getAllPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
      this.dtTrigger.next();
    }));
  }
>>>>>>> Stashed changes:src/app/views/pages/tables/admin-panel/admin-panel.component.ts
}

