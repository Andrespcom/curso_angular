import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { RouterLink, RouterModule } from '@angular/router';
import { TitleComponent } from "@shared/title/title.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './users.component.html',
})
export default class UsersComponent {
  public usersService = inject(UsersService);
 }
