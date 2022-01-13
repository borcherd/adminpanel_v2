import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { company } from 'src/app/views/constants';

@Component({
  selector: 'app-edit-person-form',
  templateUrl: './edit-person-form.component.html'
})
export class EditPersonFormComponent implements OnInit {

  @Output() submitCloseEvent = new EventEmitter<number>();
  @Input() clickInfoInput: Event;

  formPerson: FormGroup;
  person: Person;


  constructor() { }

  ngOnInit(): void {
    this.person = this.clickInfoInput['row']
    this.initForm();
  }

  initForm(){
    console.log(this.person.firstName)
    this.formPerson = new FormGroup({
      email: new FormControl(this.person.email),
      name: new FormControl(this.person.lastName),
      firstName: new FormControl(this.person.firstName),
      phoneNumber: new FormControl(this.person.gsm),
    })
  }

  onSubmit(){
    this.createNewPerson();
  }

  deletePerson(){
    console.log("todo: delete person")
    this.submitCloseEvent.emit(2)
  }

  createNewPerson(){
    const newPerson = new Person(this.person.role,
    this.formPerson.controls['email'].value, 
    this.formPerson.controls['firstName'].value, 
    this.formPerson.controls['name'].value, 
    this.person.company, null);
    newPerson.gsm = this.formPerson.controls['phoneNumber'].value;
    newPerson.organization = company;
    this.updatePerson(newPerson);
  }

  updatePerson(person: Person) {
    // this.createSubscription = this.apiService.updatePerson(person.personId, person).subscribe((response: Person) => {
    //   console.log(response);
    // });
    console.log('updating in dialog');
    console.log(person);
    this.submitCloseEvent.emit(1)
  }
}
