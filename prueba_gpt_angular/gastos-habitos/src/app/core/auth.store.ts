import { signal, computed } from '@angular/core';

// Modelo de usuario
export type User = Readonly<{ id: string; nombre: string }>;

// Store de autenticación
class AuthStore {
  // Señal privada que guarda el usuario actual (null si no hay sesión)
  private readonly _user = signal<User | null>(null);

  // Computed públicas: derivan valores a partir de _user
  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => this._user() !== null);

  // Métodos públicos para actualizar el estado
  login(user: User): void {
    this._user.set(user);
  }

  logout(): void {
    this._user.set(null);
  }
}

// Instancia global exportada
export const authStore = new AuthStore();