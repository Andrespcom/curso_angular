import { Component, computed, inject, OnInit } from '@angular/core';
import { GastosService } from './gastos.service';
import { GastoFormComponent } from './gasto-form.component';
import { GastoStatsComponent } from './gasto-stats.component';
import { GastoListComponent } from './gasto-list.component';
import type { Gasto } from '../../core/models/gasto';
type NewGasto = Readonly<Omit<Gasto, 'id'>>;
@Component({
  selector: 'gastos.page.component',
  template: `
    <section class="container">
      <h1 class="title">Gastos</h1>
      <app-gasto-form (guardar)="onGuardar($event)"></app-gasto-form>
      <app-gasto-stats [items]="items()"></app-gasto-stats>
      <app-gasto-list [items]="items()"></app-gasto-list>
    </section>
  `,
  imports: [GastoFormComponent, GastoListComponent, GastoStatsComponent],
})
export class GastosPageComponent implements OnInit {
  private readonly service = inject(GastosService);
  readonly items = computed(() => this.service.items());
  ngOnInit() {
    this.service.fetchAll().subscribe();
  }
  onGuardar(nuevo: Omit<Gasto, 'id'>): void {
    this.service.create(nuevo).subscribe();
  }
}
