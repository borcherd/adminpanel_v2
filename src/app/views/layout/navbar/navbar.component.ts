import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  currentUser: Person;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router, 
    private apiService: PersonService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  getUser(){
    this.subscription.add(this.apiService.getCurrentUser().subscribe((employee: Person) => {
      // Setting current user
      this.currentUser = employee;
      employee.photo = '/assets/images/default_icon.png';
      /* this.subscription.add(this.apiService.getPersonProfilePicture(employee.personId).subscribe((profilePicture:ProfilePicture)=>{
          employee.photo = 'data:image/png;base64,' + profilePicture.image;
          this.currentUser = employee;
        }, error => {
          employee.photo = '/assets/images/default_icon.png';
          this.currentUser = employee;
      })) */
    }));
  }
}
