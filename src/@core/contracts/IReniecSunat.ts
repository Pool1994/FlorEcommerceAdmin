export interface IReniec {
  nombres: string
  apellido_paterno: string
  apellido_materno: string
  nombre_completo: string
  genero?: 'F' | 'M'
  fecha_nacimiento: string
  codigo_verificacion: string
  numero_documento: string
}
export interface ISunat {
  razon_social: string
  condicion: string
  nombre_comercial: string
  tipo: string
  fecha_inscripcion: string
  estado: string
  direccion: string
  sistema_emision: string
  actividad_exterior: string
  sistema_contabilidad: string
  fecha_emision_electronica: string
  fecha_ple: string
  oficio?: string
  actividades_economicas?: any[]
  comprobante_pago?: any[]
  sistema_emision_electronica?: any[]
  padrones?: any[]
  departamento?: string
  provincia?: string
  distrito?: string
  representantes_legales?: any[]
  numero_documento: string
  numero_documento_dni?: string
  tipo_consulta: 'DIEZ' | 'VEINTE'
}
