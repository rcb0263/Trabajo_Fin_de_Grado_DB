import { ObjectId } from "mongodb"

//PRIVILEGIOS
type PrivilegiosAula ={
    crearAula: boolean,
    eliminarAula: boolean,
    cambiarAula: boolean
}

type PrivilegiosAsignatura ={
    asignatura: ObjectId,
    cambiarAula: boolean,
    cambiarHorario: boolean,
    crearExcepciones: boolean,
    cambiarProfesor: boolean,
    cambiarDelegado: boolean
}

type PrivilegiosUsuario={
    _id?: ObjectId,
    cambiarAsignaturas: true
}


//CUENTAS
export type Usuario = {
    nombre: string,
    apellidos: string,
    email: string,
    grado: string
}

export type Administrador = {
    nombre: string
}
type Invitado = {
    date: Date
}

//ASIGNATURAS
export type Hora={
    hora: number,
    minuto: number
}
type Sesion ={
    aula?: ObjectId, 
    dia: 'L'|'M'|'X'|'J'|'V' , 
    hora: {
        inicio: string,
        fin: string
    }
}
type Excepcion ={
    tipo: 'practica' | 'cancelar'| 'recuperación'| 'examen',
    practica?: number,
    fecha: 'dd/mm/yy',
    horario: Sesion
}

export type Horario_MT = {
    profesor: ObjectId,
    horarios: Sesion,
    excepciones: Excepcion[];
    estudiantes: ObjectId[]
}

type Teoria ={
   mañana?: Horario_MT,
   tarde?: Horario_MT
}

export type GrupoPracticas ={
    grupo: number,
    profesor: ObjectId,
    estudiantes: ObjectId[],
    fechas: Excepcion[]
}

export type Asignatura = {
   _id?: ObjectId
   nombre: string,
   teoria?: Teoria,
   practicas?: GrupoPracticas[],
   grado: string,
   curso: number,
   año: string,
   semestre: 'Primero'|'Segundo',
   fechaDeCreacion: Date
}

//AULA
//Incomplete
export type Aula = {
    _id?: ObjectId,
    edificio: 'A'|'B'|'C'|'otro'
    aula: string,
    capacidad: number
}



//USUARIOS
//Incomplete
export type Grupo = {
    miembros: ObjectId[],
    privilegiosAsignatura: PrivilegiosAsignatura[] | boolean,
    privilegiosEstudiante: PrivilegiosUsuario | boolean,
    privilegiosProfesor: PrivilegiosUsuario | boolean,
    privilegiosAula: PrivilegiosAula[]
}

export type Cuenta ={
   _id?: ObjectId,
   posición: "estudiante" | "profesor" | "administrador" | "invitado",
   datos?: Usuario | Administrador | Invitado
   grupos: Grupo[],
   fechaDeCreacion: Date
}



