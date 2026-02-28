import { Router } from "express"
import { getDb } from "../mongo"
import { crearUsuario, getAlumnos } from "../collections/usuarios";
const router = Router();
const colleccion = () => {return getDb().collection('Alumnos');}

router.get("/",(req, res)=>{
    res.send("Se ha conectado a la ruta alumnos correctamente")
})
router.post("/Crear", async (req, res)=>{
 try {
    const result = await crearUsuario(req,res, 'Alumno')
    res.status(201).json(result)
 } catch (error) {
    res.status(404).json(error)
 }
})
router.get("/Get",async (req, res)=>{
 try {
   const result = await getAlumnos()
   res.status(201).json(result)
 } catch (error) {
    res.status(409).json(error)
 }
})
export default router;