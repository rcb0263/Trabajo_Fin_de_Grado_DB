import { Router } from "express"
import { getDb } from "./mongo"
import { ObjectId } from "mongodb";
import { Cuenta} from "./types";
import { crearAsignatura, crearGrupoPractica, crearHorarioTeoria, crearUsuario } from "./funciones";

const router = Router();
const CAlumnos = () => {return getDb().collection('Alumnos');}
const CProfesores = () => {return getDb().collection('Profesores');}
const CAsignaturas = () => {return getDb().collection('Asignaturas');}

router.get("/", async (req, res)=>{
    try {
        const endpoints:[string[]] = [["GET:","/estudiantes","/profesores"]]
        res.status(404).json(endpoints)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get("/estudiantes",async (req, res)=>{
    try {
        const estudiantes = await CAlumnos().find().toArray();

        res.status(201).json(estudiantes);
    } catch (error) {
        res.status(404).json(error)
    }
})
router.get("/profesores",async (req, res)=>{
    try {
        const profesores = await CProfesores().find().toArray();

        res.status(201).json(profesores);
    } catch (error) {
        res.status(404).json(error)
    }
})
router.get("/asignaturas",async (req, res)=>{
    try {
        const asignaturas = await CAsignaturas().find().toArray();

        res.status(201).json(asignaturas);
    } catch (error) {
        res.status(404).json(error)
    }
})
router.post("/estudiante", async (req, res)=>{
 try {
    const estudiante:Cuenta ={
        posición: "estudiante",
        grupos: [],
        fechaDeCreacion: new Date(),
    }

    estudiante.datos = crearUsuario(req,res);
    if(estudiante.datos){
        const result = await CAlumnos().insertOne(estudiante)
        res.status(201).json(result)
    }

 } catch (error) {
    res.status(404).json(error)
 }
})
router.post("/profesor", async (req, res)=>{
 try {
    const profesor:Cuenta ={
        posición: "profesor",
        grupos: [],
        fechaDeCreacion: new Date(),
        datos: crearUsuario(req,res)
    }
    if(profesor.datos){
        const result = await CProfesores().insertOne(profesor)
        res.status(201).json(result)
    }
 } catch (error) {
    res.status(404).json(error)
 }
})

router.post("/asignatura", async (req, res)=>{
 try {
    const asignatura = crearAsignatura(req,res)
    if(asignatura){
        const result = await CAsignaturas().insertOne(asignatura)
        res.status(201).json(result)
    }
 } catch (error) {
    res.status(404).json(error)
 }
})
router.post("/asignatura/horarioTeoria/:idAsignatura", async (req, res)=>{
 try {
    const sesion = await crearHorarioTeoria(req,res, CProfesores())
    const asignaturaId = req.params.idAsignatura;
    console.log(sesion)
    if (!ObjectId.isValid(asignaturaId)) {
      return res.status(400).json({ message: "ID de asignatura no es valido" });
    }
    const asignatura = await CAsignaturas().findOne({ _id: new ObjectId(asignaturaId)});
    if(!asignatura){
      return res.status(400).json({ message: "No existe la asignatura" });
    }

    await CAsignaturas().updateOne(
      { _id: new ObjectId(asignaturaId) },
      { $set: { teoria: {mañana: sesion} } }
    );
    res.status(201).json("horario correctamente añadido")
 } catch (error) {
    res.status(404).json(error)
 }
})
router.post("/asignatura/grupoPractica/:idAsignatura", async (req, res)=>{
 try {
    const grupoPracticas = await crearGrupoPractica(req,res, CProfesores())
    if (!grupoPracticas) return;

    const asignaturaId = req.params.idAsignatura;
    if (!ObjectId.isValid(asignaturaId)) {
      return res.status(400).json({ message: "ID de asignatura no es valido" });
    }

    const asignatura = await CAsignaturas().findOne({ _id: new ObjectId(asignaturaId)});
    if(!asignatura){
      return res.status(400).json({ message: "No existe la asignatura" });
    }
    
    asignatura.practicas.push(grupoPracticas)
    if(typeof(req.body?.grupo)=="number"){
        await CAsignaturas().updateOne(
            { _id: new ObjectId(asignaturaId) },
            { $set: { practicas: asignatura.practicas } }
        );
    }
    res.status(201).json("horario correctamente añadido")
 } catch (error) {
    res.status(404).json(error)
 }
})
export default router;