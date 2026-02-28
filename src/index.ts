    import express from "express"
    import { connectMongoDB } from "./mongo";
    import rutasAuth from "./routes/auth";
    import rutasAsignturas from "./routes/asignaturas";
    import rutasAlumnos from "./routes/alumnos";
    import rutasProfesores from "./routes/profesores";
    import rutasAulas from "./routes/aulas";

    connectMongoDB();

    const app = express();
    app.use(express.json())
    app.use('/asignaturas', rutasAsignturas)
    app.use('/alumnos', rutasAlumnos)
    app.use('/profesores', rutasProfesores)
    app.use('/aulas', rutasAulas)
    app.use('/auth', rutasAuth)

    //Aplicar las rutas
    app.listen(3000, ()=>console.log("El API se ha conectado"))