import { ChangeDetectionStrategy, Component, computed, input, OnInit } from '@angular/core';
import { Gasto } from '../../core/models/gasto';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-gasto-stats',
  imports: [DecimalPipe],
  template: `
    <section class="stats">
      <p><strong>Total:</strong> {{ total() | number : '1.2-2' }} €</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GastoStatsComponent {
  readonly items = input<readonly Gasto[]>([]);
  readonly total = computed(() => this.items().reduce((acc, g) => acc + g.importe, 0));
}
