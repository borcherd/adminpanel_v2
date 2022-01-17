import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { company } from 'src/app/views/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-person-form',
  templateUrl: './new-person-form.component.html',
  styleUrls: ['./new-person-form.component.scss']
})
export class NewPersonFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  
  private subscription: Subscription = new Subscription();

  constructor(private personService: PersonService) {   }

  ngOnInit(): void {
    this.initaliseForm();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.createPerson();
  }

  /**
   * creates a new person object
   */
  createPerson(){
    const person = new Person(
      this.form.value.role.toString().toLowerCase(),
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
    this.verifyUser(person);
  }

  /**
   * verifies if the user exists by checking for duplicate emails, then pushes it to the database
   * @param person to verify and push
   */
  verifyUser(person: Person){
    this.subscription.add(this.personService.getPersonByEmail(person.email).subscribe((response:Person)=>{
      if (response != null) {
        console.log("invalid email")
      } else {
        /* if (this.imageSrc) {
          this.checkImageSize(person);
        } else {
          this.createPerson(person);
        } */
        this.subscription.add(this.personService.createPerson(person).subscribe((response: Person) => {
          this.form.reset();
          Swal.fire({
            title: 'Succes!',
            text: 'Persoon geregistreerd',
            icon: 'success',
            confirmButtonText: 'Cool',
            toast: true,
            position: 'top-end',
            showConfirmButton:false,
            timer:1113000
          }) 
          window.location.reload();
        }))
      }
    }))
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

