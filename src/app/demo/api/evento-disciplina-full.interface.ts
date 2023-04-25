import { Configuracion } from "./configuracion.interface";
import { Disciplina } from "./disciplina.interface";
import { Evento } from "./evento.interface";

export interface EventoDisciplinaFull {
  id?: number;
  disciplina?: Disciplina;
  evento?: Evento;
  configuracion?: Configuracion;
}
