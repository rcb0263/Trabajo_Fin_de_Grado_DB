import { Router } from "express"
import { getDb } from "../mongo"
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = Router();
const colleccion = () => {return getDb().collection<User>('placeholder');}
const colleccionAlumnos = () => {return getDb().collection<User>('Alumnos');}
const colleccionProfesores = () => {return getDb().collection<User>('Profesores');}

const SECRET = process.env.SECRET||""; 

type User = {
    email: string,
    _id?: ObjectId,
    username: string,
    password: string
}

type JetPayload={
    id: string,
    email: string
}

router.get("/",(req, res)=>{
    res.send("Se ha conectado a la ruta auth correctamente")
})

router.post("/register", async (req,res)=>{
    try {
        const {email, password, username} = req.body as {email: string, password:string, username:string}
        const users = colleccion()
        const exists = await users.findOne({email: email})
        if(exists){
            return res.status(400).json({message:" Ya existe"})
        }

        const passEncripta = await bcrypt.hash(password,10)
        await users.insertOne({email, password: passEncripta, username})

        res.status(201).json({message: "Usuario creado correctamente"})
    }catch (error) {
        res.status(500).json({message:error})
    }
})
router.post("/login", async (req,res)=>{
    try {
        const {email, password, username} = req.body as {email: string, password:string, username:string}
        const users = colleccion()

        const user = await users.findOne({email: email})
        if(!user) return res.status(400).json({message:" email incorrecto"})
        
        const validPass = await bcrypt.compare(password, user.password)
        if(!validPass) return res.status(201).json({message: " contraseña incorrecta"})
        
        const token = jwt.sign({id: user._id?.toString(), email: user.email}, SECRET,{
            expiresIn: "1h"
        })

        res.status(201).json({message: {email: user.email, token: "Bearer "+token}})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

export default router;