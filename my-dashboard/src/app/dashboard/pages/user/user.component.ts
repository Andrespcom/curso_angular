import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { UsersService } from '../../../services/users.service';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './user.component.html',
  styles: ``,
})
export default class UsersComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  // public user = signal<User| undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(switchMap(({ id }) => this.usersService.getUserById(id)))
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario: ${this.user()?.first_name} ${this.user()?.last_name} `;
    }

    return 'Información del usuario';
  });
}
