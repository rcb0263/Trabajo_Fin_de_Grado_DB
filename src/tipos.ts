import { ObjectId } from "mongodb"

export type Excepcion ={
    aula: string, 
    fecha: string,//'dd/mm/yyyy'
    horaInicio: Hora,
    horaFin: Hora,
}
export type Hora = {
    hora: number,
    minuto: number
}
export type Sesion ={
    aula: string, 
    dia: 'L'|'M'|'X'|'J'|'V' , 
    horaInicio: Hora,
    horaFin: Hora,
}

export type GrupoAsignatura ={
   _id?: ObjectId,
    tipo: 'Teoria' | 'Practica',
    asignatura: string,
    profesores: string[],
    grupo: string, //A, B, C, ...
    alumnos: string[],
    horarios: Sesion[],
    fechas: Excepcion[]
}


export type Asignatura = {
   _id?: ObjectId
   nombre: string
   grupo: string,
   grado: string,
   teoria: ObjectId[],
   practicas: ObjectId[],
   curso: number,
   año: number,
   semestre: 'Primero'|'Segundo',
   fechaDeCreacion: Date
}
//encima de esto he creado asignaturas
export type Administrador ={
   _id?: ObjectId,
   nombre: string,
   grupos: ObjectId[], //id de grupos de privilegio
   fechaDeCreacion: Date
}

export type Usuario ={
   _id?: ObjectId,
   nombre: string,
   mail: string,
   grupos: ObjectId[], //id de grupos de privilegio
   asignaturas: ObjectId[] //id de la asignatura
   fechaDeCreacion: Date
}

export type Alumno ={
   _id?: ObjectId,
   nombre: string,
   grupos: ObjectId[], //id de grupos de privilegio
   asignaturas: ObjectId[]
   fechaDeCreacion: Date
}

export type Grupo = {
    _id?: ObjectId,
    nombre: string,
    miembros: MiembroGrupo[],
    privilegiosAsignatura: PrivilegiosAsignatura[] | boolean,
    privilegiosAlumno: PrivilegiosUsuario | boolean,
    privilegiosProfesor: PrivilegiosUsuario | boolean,
    privilegiosAula: PrivilegiosAula[],
    privilegiosAdmin: privilegiosAdmin 
}
type MiembroGrupo ={
    miembro: ObjectId[],
    fechaFin: Date
}
type PrivilegiosAula ={
    editarHorario: boolean
}

type PrivilegiosAsignatura ={
    asignatura: ObjectId, //asignatura específica
    cambiarAula: boolean, //cambiar el aula en el que se da la asignatura
    cambiarHorario: boolean, //cambiar el horario de la asignatura
    crearExcepciones: boolean, //crear o eliminar excepciones de una asignatura 
    admin: boolean
}

type PrivilegiosUsuario={
    _id?: ObjectId,
    editarUsuario: boolean,
    admin: boolean
}

type privilegiosAdmin ={
    Alumnos: boolean,
    Profesores: boolean,
    Aulas: boolean,
}

export type Aula = {
    _id?: ObjectId,
    aula: string,
    horarios: sesionAula[],
    exepciones: ExcepcionAula[]
}
export type ExcepcionAula ={
    etiqueta: string,
    sesion: Excepcion
}
export type sesionAula ={
    asignatura: ObjectId, 
    dia: 'L'|'M'|'X'|'J'|'V' , 
    horaInicio: Hora,
    horaFin: Hora,
}