import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

 //para crear tokens
 export const tokenSign = (data) =>{
    return jwt.sign({
        user: data.user,
        password: data.password,
        firma: "Osorio"
    },process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_TIMEEXPIRE
    });
 }
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

 export const validarPermiso = (req, res, next)=>{

    let token = req.headers["x-access-token"];

    try {
        if (verifyToken(token) == null ){
            res.json({
                "error":"No tiene permiso para acceder",
                "type": "token invalido"
            })
        } else {
            next();
        }
    } catch (error) {
        res.json({
            "error":"error",
            "type": "token invalido"
        })
    }
}
 