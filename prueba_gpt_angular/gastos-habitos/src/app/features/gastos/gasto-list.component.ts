import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Gasto } from '../../core/models/gasto';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-gasto-list',
  imports: [DecimalPipe],
  template: `
    <ul role="list" class="gastos">
      @for (g of items(); track g.id) {
      <li class="gasto" tabindex="0">
        <span>{{ g.concepto }}</span>
        <span>{{ g.categoria }}</span>
        <span class="importe">{{ g.importe | number : '1.2-2' }} €</span>
      </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoListComponent {
  readonly items = input<readonly Gasto[]>([]);
}
