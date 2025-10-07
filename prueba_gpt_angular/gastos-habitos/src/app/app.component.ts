import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { loaderStore } from './core/http/loader.store';
import { NgOptimizedImage } from '@angular/common';
import { authStore, User } from './core/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive,RouterLink,NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('gastos-habitos');
  readonly isLoading = computed(() => loaderStore.active() > 0);
  readonly authStore = authStore;
  toggleLogin(): void {
    if (this.authStore.isLoggedIn()) {
      this.authStore.logout();
    } else {
      const fakeUser: User = { id: '1', nombre: 'Fernando' };
      this.authStore.login(fakeUser);
    }
  }

  // Llama al store para iniciar sesión con un usuario ficticio
  login(): void {
    const fakeUser: User = { id: '1', nombre: 'Usuario Demo' };
    this.authStore.login(fakeUser);
  }

  // Cierra sesión y borra el usuario
  logout(): void {
    this.authStore.logout();
  }
}
