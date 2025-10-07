import { signal } from '@angular/core';

class LoaderStore {
  readonly active = signal<number>(0);

  start(): void { this.active.update(n => n + 1); }

  stop(): void { this.active.update(n => Math.max(0, n - 1)); }
}

export const loaderStore = new LoaderStore();