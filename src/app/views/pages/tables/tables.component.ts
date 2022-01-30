import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { RoleAuthorisationService } from 'src/app/services/role-auth.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {

  constructor(private readonly roleAuthService: RoleAuthorisationService) {
  }
  menu = MENU_ITEMS;

  ngOnInit(): void {
    this.authAdminPanel();
  }

  authAdminPanel() {
    for (const item of this.menu) {
      if (item.title === 'Admin Panel') {
        console.log('yeha');
        if (!this.roleAuthService.isAuthorised(Role.ADMIN)) {
          item.hidden = true;
        }
        // item.hidden = this.auth.isAuthorised(Role.ADMIN);
      }
    }
  }
}
