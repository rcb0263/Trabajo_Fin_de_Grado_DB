import { ObjectId } from "mongodb"
import { getDb } from "../mongo"
import { Aula } from "../tipos"



const ColeccionAsignaturas = "Asignaturas"
const ColeccionTeoria = "Teoria"
const ColeccionPractica = "Practica"
const ColeccionAula = "Aulas"
const ColeccionAlumnos= "Alumnos"
const ColeccionProfesores = "Profesores"

export const crearAula = async (req: any, res: any)=>{
    const nombre:string = req.body?.nombre //   PRBA202
    const eMsg:string[] = []
    if(!nombre || typeof(nombre)!="string"){
        eMsg.push("nombre debe ser un string")
    }
    const db = getDb()
    if(eMsg.length >0){
        res.status(400).json({message: eMsg})
    }else{
        const db = getDb()
        console.log(db)
        const asignaturas = await  db.collection<Aula>(ColeccionAsignaturas).findOne({aula: nombre})
        if(asignaturas){
            res.status(400).json({message: 'El aula ya existe'})
        }
        const datos:Aula ={
            aula: nombre,
            horarios: [],
            exepciones: []
        }
        const result = await db.collection(ColeccionAula).insertOne(datos)
        return result
    }
}