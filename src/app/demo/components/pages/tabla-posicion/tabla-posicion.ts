import { Equipo } from "../../../api/equipo.interface";
export interface TablaPosicion {
    id: number;
    Equipos: Equipo;
    Pts: number;
    pj: number;
    g: number;
    e: number;
    p: number;
    gf: number;
    gc: number;
    gd: number; 
}
