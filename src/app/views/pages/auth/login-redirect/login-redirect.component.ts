import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'ngx-success',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent implements OnInit, OnDestroy {

  private subscriber: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: PersonService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.subscriber.add(this.apiService.getCurrentUser().subscribe((user: Person) => {
        localStorage.setItem('role', user.role);
      }));
        this.router.navigateByUrl('/');
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
