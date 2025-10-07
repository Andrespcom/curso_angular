import { Component, inject, OnInit, output } from '@angular/core';
import { Gasto } from '../../core/models/gasto';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

function importePositivo(ctrl: AbstractControl<number | null>): ValidationErrors | null {
  const v = ctrl.value ?? 0;
  return v > 0 ? null : { importeNoPositivo: true };
}

@Component({
  selector: 'app-gasto-form',
  imports: [ReactiveFormsModule],
  template:  `
    <form [formGroup]="form" (ngSubmit)="emitir()">
      <label>Concepto <input formControlName="concepto" required /></label>
      <label>Categoría
        <select formControlName="categoria">
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="ocio">Ocio</option>
          <option value="otros">Otros</option>
        </select>
      </label>
      <label>Importe <input type="number" formControlName="importe" /></label>
      <label>Fecha <input type="date" formControlName="fechaISO" /></label>
      <button type="submit" [disabled]="form.invalid">Guardar</button>
    </form>
  `,
})
export class GastoFormComponent{
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    concepto: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['otros' as const],
    importe: [0, [importePositivo]],
    fechaISO: [new Date().toISOString().slice(0, 10)]
  });

  readonly guardar = output<Omit<Gasto, 'id'>>();

  emitir(): void {
    if (this.form.valid) {
      this.guardar.emit(this.form.getRawValue() as Omit<Gasto, 'id'>);
    }
  }
}
