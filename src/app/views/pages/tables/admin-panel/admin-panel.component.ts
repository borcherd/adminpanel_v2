import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { DataTable } from "simple-datatables";
import { Subject, Subscription } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { company } from 'src/app/views/constants';
import { ColumnMode } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  form: FormGroup;
  persons: Person[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  
  private subscription: Subscription = new Subscription();

  constructor(private personService: PersonService) {   }

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
      const person: Person = new Person(
        this.form.value.role,
        this.form.value.email,
        this.form.value.firstName,
        this.form.value.name,null,null);
      if (this.form.value.role == '1'){
        person.company = this.form.value.company;
      } else {
        person.company = company;
      }
      person.gsm = this.form.value.phoneNumber;
      person.organization = company;
      console.log(person)
  }

  /**
   * initialises forms to be used in html
   */
  initaliseForm(){
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      firstName: new FormControl('',Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phoneNumber: new FormControl('',Validators.required),
      role: new FormControl('',Validators.required),
      company: new FormControl('')
    })
  }

  /**
   * Fetches all persons from the database
   */
  getAllPersons() {

    this.subscription.add(this.personService.getAllPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
      console.log(persons);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    }));
    console.log(this.persons)
    
  }
}

