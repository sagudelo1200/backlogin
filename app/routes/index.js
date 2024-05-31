import { Router } from "express";
import rutaLogin from "./routes.Login.js";


const ruta = Router();

ruta.use("/api",rutaLogin);


export default ruta;