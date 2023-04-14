export interface Usuario {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
  foto_perfil?: string | File;
  id_tipo_usuario?: number;
}
