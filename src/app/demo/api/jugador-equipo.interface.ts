import { Jugador } from "./jugador.interface";

export interface Posicion {
  id?: number;
  descripcion?: string;
}

export interface JugadorEquipo {
  id?: number;
  jugador?: Jugador;
  id_equipo_disciplina?: number;
  posicion?: Posicion;
  numero?: number;
}
