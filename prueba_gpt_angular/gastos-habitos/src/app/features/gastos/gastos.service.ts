import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap, retry } from 'rxjs/operators';
import { Gasto } from './../../core/models/gasto';

@Injectable({ providedIn: 'root' })
export class GastosService {
  private readonly http = inject(HttpClient);

  // Caché in-memory reactiva
  private readonly _items = signal<readonly Gasto[]>([]);
  readonly items = computed(() => this._items());

  readonly total = computed(() =>
    this._items().reduce((acc, g) => acc + g.importe, 0)
  );

  fetchAll(): Observable<readonly Gasto[]> {
    return this.http.get<readonly Gasto[]>('/api/gastos').pipe(
      retry({ count: 2, delay: (_, i) => timer(expBackoffMs(i)) }),
      map(items => items.map(normalizaGasto)),
      catchError(() => of([] as const)),
      switchMap(items => { this._items.set(items); return of(items); })
    );
  }

  create(nuevo: Omit<Gasto, 'id'>): Observable<Gasto> {
    return this.http.post<Gasto>('/api/gastos', nuevo).pipe(
      map(normalizaGasto),
      switchMap(g => { this._items.update(xs => [g, ...xs]); return of(g); })
    );
  }

  update(id: string, cambios: Partial<Omit<Gasto, 'id'>>): Observable<Gasto> {
    return this.http.patch<Gasto>(`/api/gastos/${id}`, cambios).pipe(
      map(normalizaGasto),
      switchMap(g => {
        this._items.update(xs => xs.map(x => x.id === id ? g : x));
        return of(g);
      })
    );
  }

  remove(id: string): Observable<true> {
    return this.http.delete<unknown>(`/api/gastos/${id}`).pipe(
      switchMap(() => {
        this._items.update(xs => xs.filter(x => x.id !== id));
        return of(true as const);
      }),
      catchError(() => of(false as unknown as true)) // si quieres tratar errores, cambia esto
    );
  }
}

function normalizaGasto(g: Gasto): Gasto {
  // Asegura tipos y formatos
  return {
    ...g,
    importe: Number(g.importe),
    fechaISO: g.fechaISO.slice(0, 10),
  };
}

function expBackoffMs(attempt: number): number {
  // attempt: 0,1,2...
  const base = 300;
  return Math.min(2000, Math.pow(2, attempt) * base);
}
