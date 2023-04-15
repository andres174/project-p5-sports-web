import { Equipo } from "../../../api/equipo.interface";
export interface TablaPosicion {
    id: number;
    Equipos: Equipo;
    Pts: number;
    PJ: number;
    G: number;
    E: number;
    P: number;
    GF: number;
    GC: number;
    GD: number; 
}
