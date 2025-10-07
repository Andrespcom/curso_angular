export type Categoria = 'comida' | 'transporte' | 'ocio' | 'otros';

export interface Gasto {
  readonly id: string;
  readonly concepto: string;
  readonly categoria: Categoria;
  readonly importe: number;       // > 0
  readonly fechaISO: string;      // YYYY-MM-DD
}