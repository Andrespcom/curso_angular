import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habito } from '../../core/models/habito';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HabitosService {
  private readonly http = inject(HttpClient);
  private readonly _items = signal<readonly Habito[]>([]);
  readonly items = computed(() => this._items());

  readonly rachaTotal = computed(() =>
    this._items().reduce((acc, h) => acc + h.racha, 0)
  );

  fetchAll(): Observable<readonly Habito[]> {
    return this.http.get<readonly Habito[]>('/api/habitos').pipe(
      map(xs => xs.map(n => normalizaHabito(n))),
      switchMap(xs => { this._items.set(xs); return of(xs); })
    );
  }

  toggle(id: string): Observable<Habito> {
    const actual = this._items().find(h => h.id === id);
    if (!actual) return of(null as unknown as Habito);

    const toggled: Partial<Habito> = {
      activo: !actual.activo,
      racha: !actual.activo ? actual.racha + 1 : Math.max(0, actual.racha - 1),
      actualizadoISO: new Date().toISOString().slice(0,10)
    };

    return this.http.patch<Habito>(`/api/habitos/${id}`, toggled).pipe(
      map(normalizaHabito),
      switchMap(h => { this._items.update(xs => xs.map(x => x.id === id ? h : x)); return of(h); })
    );
  }
}

function normalizaHabito(h: Habito): Habito {
  return {
    ...h,
    racha: Number(h.racha),
    actualizadoISO: h.actualizadoISO.slice(0, 10),
  };
}
