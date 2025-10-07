export interface Habito {
  readonly id: string;
  readonly nombre: string;
  readonly activo: boolean;
  readonly racha: number;     // días consecutivos
  readonly actualizadoISO: string; // fecha última actualización
}