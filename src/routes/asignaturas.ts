import { Router } from "express"
import { getDb } from "../mongo"
import { asignarAlumno, asignarProfesor, crearAsignatura, crearExcepcion, crearGrupoAsignatura, crearHorario, getAsignaturas, quitarAlumno, quitarProfesor } from "../collections/asignaturas";
const router = Router();
const colleccion = () => {return getDb().collection('Asignaturas');}

router.get("/",(req, res)=>{
    res.send("Se ha conectado a la ruta Asignaturas correctamente")
})
router.get("/Get/Asignaturas",async (req, res)=>{
 try {
   const result = await getAsignaturas()
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.post("/Crear", async (req, res)=>{
 try {
    const result = await crearAsignatura(req,res)
    res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.post("/Grupo/Crear", async (req, res)=>{
 try {
   const result = await crearGrupoAsignatura(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.put("/Grupo/Horario/Crear", async (req, res)=>{
 try {
   const result = await crearHorario(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.put("/Grupo/Excepcion/Crear", async (req, res)=>{
 try {
   const result = await crearExcepcion(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.put("/Grupo/Profesor/Add", async (req, res)=>{
 try {
   const result = await asignarProfesor(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.put("/Grupo/Profesor/Remove", async (req, res)=>{
 try {
   const result = await quitarProfesor(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.put("/Grupo/Alumno/Add", async (req, res)=>{
 try {
   const result = await asignarAlumno(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.put("/Grupo/Alumno/Remove", async (req, res)=>{
 try {
   const result = await quitarAlumno(req,res)
   res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})


export default router;