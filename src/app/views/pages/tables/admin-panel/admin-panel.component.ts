import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { company } from 'src/app/views/constants';
import { DataTable } from "simple-datatables";


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  form: FormGroup;

  constructor() { 

  }

  ngOnInit(): void {
    this.initaliseForm();
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

  
}

