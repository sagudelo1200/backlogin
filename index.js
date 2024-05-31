import app from "./app/app.js";
import { config } from "dotenv";
config();


//Index llama a app y al puerto de .env
let port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Estoy en puerto ${port}`);
});