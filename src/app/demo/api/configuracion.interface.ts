export interface Configuracion {
  id?: number;
  nombre?: string;
  numero_grupos?: number;
  numero_miembros?: number;
  minutos_juego?: number;
  minutos_entre_partidos?: number;
  tarjetas?: boolean;
  ida_y_vuelta?: boolean;
  id_organizador?: number;
  nombre_organizador?: string;
  apellido_organizador?: string;
}
