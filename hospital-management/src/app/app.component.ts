import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Role } from './shared/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hospital Management';
  isAdmin: boolean;
  isDoctor: boolean;

  constructor(private keycloak: KeycloakService) {
    this.isAdmin = keycloak.isUserInRole(Role.Admin);
    this.isDoctor = keycloak.isUserInRole(Role.Doctor);
  }
}
