import { Router, json } from "express";

//Importar variables del controlador
import { actualizarLogin, crearLogin, eliminarLogin, mostrarLogin, listarLogin, loginLogin} from "../controllers/controllers.Login.js";

//Importa el permiso para loguearse
import { validarPermiso,  } from "../middlewares/middlewares.Login.js";

//Declarar variables
const rutaLogin = Router();


//Para ir a cada ruta de logueo
rutaLogin.post("/usuario", crearLogin);
rutaLogin.get("/usuario/:id", mostrarLogin);
rutaLogin.get("/usuario/", listarLogin);
rutaLogin.put("/usuario", validarPermiso, actualizarLogin);
rutaLogin.delete("/usuario", validarPermiso, eliminarLogin);
rutaLogin.post("/login", loginLogin);

// rutaLogin.get("/prueba", (req, res)=>{
//     res.json({"mensaje":"luisa"});
// });



export default rutaLogin;
