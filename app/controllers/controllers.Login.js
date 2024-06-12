import { pool } from "../../config/db.mysql.js";
import bcryptjs from 'bcryptjs';

//Importar token para loguearse
import { tokenSign } from "../middlewares/middlewares.Login.js";

//Crear usuario PUT
export const crearLogin = async(req, res)=>{
    let info = req.body;

    let contrasenaEncriptada = await bcryptjs.hash(info.password,5);
    
    try {
        let resultado = await pool.query(` 
        insert into cliente (
        iduser, user, name, password) values
        (
            ${info.iduser}, '${info.user}',
            '${info.name }', '${contrasenaEncriptada}'
           
        )
    `);
    if(resultado[0].affectedRows > 0 ){
        res.json({
            respuesta:"registro insertado"
        })
    } else{
        res.json({
            respuesta:"registro no insertado"
        })
    }

    } catch (error) {
        res.json({
            "error":error,
            "method": "post"
        })
    } 
 
}

//Mostrar usuario GET
export const mostrarLogin = async(req, res)=>{

    let id = req.params.id;

    try {
        const resultado = await pool.query(`select * from cliente where iduser = ${id}`);
 
        res.json(resultado[0]);
            
    } catch (error) {
        res.json({
            "error":error,
            "method": "get"
        })
}
}

//Actualizar usuario PUT
export const actualizarLogin = async(req, res)=>{
    let info = req.body;

    try {
        let resultado = await pool.query(` 
            update cliente
            set
            user = '${info.user}',
            name = '${info.name}',
            password = '${info.password}'
            where iduser = ${info.iduser}
    `);
    if(resultado[0].affectedRows > 0 ){
        res.json({
            respuesta:"registro modoficado"
        })
    } else{
        res.json({
            respuesta:"no modifico nada"
        })
    }

    } catch (error) {
        res.json({
            "error":error,
            "method": "put"
        })
    } 
}

//Eliminar usuario DELTE
export const eliminarLogin = async(req, res)=>{
    let info = req.body;

    try {
        let resultado = await pool.query(` 
            delete from cliente
           where iduser = ${info.iduser}
    `);
    if(resultado[0].affectedRows > 0 ){
        res.json({
            respuesta:"registro borrado"
        })
    } else{
        res.json({
            respuesta:"no borro nada"
        })
    }

    } catch (error) {
        res.json({
            "error":error,
            "method": "delete"
        })
    } 
}

//Lista completa usuarios GET
export const listarLogin = async(req, res)=>{

    try {
        const resultado = await pool.query("select * from cliente");
 
        res.json(resultado[0]);
            
    } catch (error) {
        res.json({
            "error":error,
            "method": "get"
        })
}
}

//Parainiciar sesión
export const loginLogin = async(req, res)=>{

    let user = req.body.user;
    let password = req.body.password;

    
    
    try {
       let resultado = await pool.query(`
       select user from cliente
       where user = '${user}' and password = '${password}'
       `);

      if (resultado[0]==""){
      res.json({
        respuesta:"Logueo incorrecto",
        estado:false
       });
    }else{
        let token= tokenSign({
            user:user,
            password:password
        });
        
        //Guardar token en las cookies
       res.json({
        respuesta:"Logueo correcto",
        estado: true,
        token: token
       });
    }
    } catch (error) {
        res.json({
            respuesta: "Error en el logueo",
            type: error
        })
    }
    
}

