import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { company } from 'src/app/views/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-person-form',
  templateUrl: './edit-person-form.component.html'
})
export class EditPersonFormComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @Output() submitCloseEvent = new EventEmitter<number>();
  @Input() clickInfoInput:any;

  formPerson: FormGroup;
  person: Person;


  constructor(private personService:PersonService) { }

  ngOnInit(): void {
    this.person = this.clickInfoInput['row']
    this.initForm();
  }

  /**
   * initialises the form
   */
  initForm(){
    this.formPerson = new FormGroup({
      email: new FormControl(this.person.email),
      name: new FormControl(this.person.lastName),
      firstName: new FormControl(this.person.firstName),
      phoneNumber: new FormControl(this.person.gsm),
    })
  }

  /**
   * function called when submit button is presses (updating)
   */
  onSubmit(){
    this.createNewPerson();
  }

  /**
   * function called when delete button is pressed (delete)
   */
  deletePerson(){
    this.subscription.add(this.personService.deletePerson(this.clickInfoInput.row.personId).subscribe((person: Person)=>{
      Swal.fire({
        title: 'Succes!',
        text: 'Persoon verwijderd',
        icon: 'success',
        confirmButtonText: 'Cool',
        toast: true,
        position: 'top-end',
        showConfirmButton:false,
        timer:1113000
      })
      this.submitCloseEvent.emit(2)
    }))
  }

  /**
   * creates a new person object
   */
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

  /**
   * updates the person object 
   * @param person updated person object
   */
  updatePerson(person: Person) {
    this.subscription.add(this.personService.updatePerson(this.clickInfoInput.row.personId, person).subscribe((Response: Person)=>{
      Swal.fire({
        title: 'Succes!',
        text: 'Persoon aangepast',
        icon: 'success',
        confirmButtonText: 'Cool',
        toast: true,
        position: 'top-end',
        showConfirmButton:false,
        timer:1113000
      })
      this.submitCloseEvent.emit(1)
    }))
  }
}
