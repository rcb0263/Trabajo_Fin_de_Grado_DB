import { ObjectId } from "mongodb"
import { getDb } from "../mongo"

import { Usuario } from "../tipos"


const ColeccionAlumnos= "Alumnos"
const ColeccionProfesores = "Profesores"

export const crearUsuario = async (req: any, res: any, tipoUsuario:string)=>{
    const nombre:string = req.body?.nombre //   grupo: string
    const mail:string = req.body?.mail //   grupo: string
    let coleccion = ''
    const eMsg:string[] = []
    if(tipoUsuario=='Alumno'){
        coleccion=ColeccionAlumnos
    }else if(tipoUsuario=='Profesor'){
        coleccion=ColeccionProfesores
    }else{
        return res.status(400).json({message: 'el tipo esta mal en el codigo'})
    }
    if(!nombre || typeof(nombre)!="string"){
        eMsg.push("nombre debe ser un string")
    }
    const db = getDb()
    if(!mail || typeof(mail)!="string"||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)){
        eMsg.push("mail debe ser un correo electronico valido")
    }else{
        const existeMailAlumno = await db
        .collection(ColeccionAlumnos)
        .findOne({ mail });
        const existeMailProfesor = await db
        .collection(ColeccionProfesores)
        .findOne({ mail });

        if (existeMailAlumno || existeMailProfesor) {
        eMsg.push("Ya existe un usuario con ese correo electrónico");
        }
    }
    if(eMsg.length >0){
        res.status(400).json({message: eMsg})
    }else{
        const datos:Usuario ={
            nombre: nombre,
            mail: mail,
            grupos: [],
            asignaturas: [],
            fechaDeCreacion: new Date(),
        }
        const result = await db.collection(coleccion).insertOne(datos)
        return result
    }
}
export const getAlumnos= async ()=>{
    const db = getDb()
    console.log(db)
    const alumnos = await  db.collection<Usuario>(ColeccionAlumnos).find().toArray()
    return alumnos;
}
export const getProfesores= async ()=>{
    const db = getDb()
    console.log(db)
    const alumnos = await  db.collection<Usuario>(ColeccionProfesores).find().toArray()
    return alumnos;
}
