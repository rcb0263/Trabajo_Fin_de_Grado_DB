

//Estudiantes
//POST: body -> student

import { ObjectId } from "mongodb"
import { Asignatura, Usuario, Hora, Horario_MT, GrupoPracticas } from "./types"

const comprobarFormarHora = (horario: string) => {
    const horarioSeparado = horario.split(':')
    const hora = Number(horarioSeparado[0]);
    const minuto = Number(horarioSeparado[1]);
    if(horarioSeparado.length!=2 || hora < 1 || hora > 23 || minuto <0||minuto>59){
        return false;
    }else{
        return true
    }
}

export const crearUsuario = (req: any, res: any)=>{
    const nombre = req.body?.nombre
    const apellidos = req.body?.apellidos
    const email = req.body?.email
    const grado = req.body?.grado

    const eMsg:string[] = []
    if(!nombre || typeof(nombre)!="string"){
        eMsg.push("Nombre debe ser un string")
    }
    if(!grado || typeof(grado)!="string"){
        eMsg.push("grado debe ser un string")
    }
    if(!apellidos ||typeof(apellidos)!= "string" ){
        eMsg.push("apellidos debe ser un string")
    }
    if(!email || typeof(email)!="string"){
        eMsg.push("email debe ser un correo")
    }
    if(eMsg.length >0){
        res.status(401).json({message: eMsg})
    }else{
        const datos:Usuario ={
            nombre: req.body?.nombre,
            apellidos: req.body?.apellidos,
            email: req.body?.email,
            grado: req.body?.grado
        }
        return datos;
    }    
}

export const crearAsignatura = (req: any, res: any)=>{
    const nombre = req.body?.nombre
    const grado = req.body?.grado
    const curso = req.body?.curso
    const año = req.body?.año
    const semestre = req.body?.semestre
    const eMsg:string[] = []
    if(!nombre || typeof(nombre)!="string"){
        eMsg.push("Nombre debe ser un string")
    }
    if(!grado || typeof(grado)!="string"){
        eMsg.push("grado debe ser un string")
    }
    if(!curso || typeof(curso)!="number"){
        eMsg.push("curso debe ser un number")
    }
    if(!año || typeof(año)!="string"){
        eMsg.push("Año debe ser un string")
    }
    if(!semestre ||(semestre != "Primero" && semestre != "Segundo")){
        eMsg.push("semestre debe ser un Primero o Segundo")
    }
    if(eMsg.length >0){
        res.status(401).json({message: eMsg})
    }else{
        const datos:Asignatura ={
            nombre: req.body?.nombre,
            practicas: [],
            grado: req.body?.grado,
            curso: req.body?.curso,
            año: req.body?.año,
            semestre: req.body?.semestre,
            fechaDeCreacion: new Date()
        }
        return datos;
    }    
}

export const crearHorarioTeoria = async (req: any, res: any, profesores: any)=>{//Falta validar aula
    const grupo = req.body?.grupo
    const profesorid = String(req.body?.profesor)
    const dia = req.body?.sesion.dia
    const inicio = req.body?.sesion.inicio
    const fin = req.body?.sesion.fin
    const diasValidos = ["L","M","X","J","V"]
    const eMsg:string[] = []
    if(!grupo ||(grupo != "mañana" && grupo != "tarde")){
        eMsg.push("grupo debe ser un Primero o Segundo")
    }
    const profesor = await profesores.findOne({_id: new ObjectId(profesorid)});
    if(!profesor){
        eMsg.push("profesor no existe")
    }
    if(!dia || !diasValidos.includes(dia)){
        eMsg.push("Ese no es un dia valido, debe ser L, M, X, J o V")
    }

    if(!inicio || comprobarFormarHora(inicio)==false){
        eMsg.push("La hora de inicio debe ser en el formato hh:mm, 08:30")
    }

    if(!fin || comprobarFormarHora(fin)==false){
        eMsg.push("La hora de fin debe ser en el formato hh:mm, 08:30")
    }


    if(eMsg.length >0){
        res.status(401).json({message: eMsg})
    }else{
        const datos:Horario_MT ={
            profesor: new ObjectId(profesorid),
            horarios: {
                dia: req.body?.sesion.dia,
                hora: {
                    inicio: req.body?.sesion.inicio,
                    fin: req.body?.sesion.fin
                }
            },
            excepciones: [],
            estudiantes: []
        }
        return datos;
    }    
}
export const crearGrupoPractica = async (req: any, res: any, profesores: any)=>{//Falta validar aula
    const grupo = req.body?.grupo
    const profesorId = String(req.body?.profesor)
    const eMsg:string[] = []
    if(!grupo ||grupo <1 || grupo >3){
        eMsg.push("grupo debe ser un Primero o Segundo")
    }
    if(ObjectId.isValid(profesorId)){
        const profesor = await profesores.findOne({_id: new ObjectId(profesorId)});
        if(!profesor){
            eMsg.push("profesor no existe")
        }
    }else{
        eMsg.push("El id de profesor no es valido")
    }
    
    if(eMsg.length >0){
        return res.status(401).json({message: eMsg})
    }else{
        const datos:GrupoPracticas ={
            grupo: grupo,
            profesor: req.body?.profesor,
            estudiantes: [],
            fechas: []
        }
        return datos;
    }    
}