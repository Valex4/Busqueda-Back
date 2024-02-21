import bcycript from "bcryptjs";
import { query } from "../connection.js";



export const getUserByName = async (req, res) => {
    console.log("Estamos mandando esto:");
    console.log(req.body.nombre);
  try {
    const [result] = await query("SELECT * FROM clientes WHERE nombre = ?", [req.body.nombre]);
    console.log(result[0]);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error something goes wrong" + error);
    return res.status(400).json({ message: " [Error] something goes wrong!" });
  }
};

export const createUser = async (name,email,password) => {
  try {
    const salt = await bcycript.genSalt(10);
    const passwordEncript = await bcycript.hash(password, salt);
    const sql ="INSERT INTO users (name,email,password) VALUES (?,?,?)";
    const params = [name, email, passwordEncript];
    const [result] = await query(sql, params);
  } catch (error) {
    return error;
  }
};


export const getUserByPhone = async (req, res) => {
    try {
     console.log(req.body.nombre);
      const [result] = await query("SELECT * FROM clientes WHERE telefono= ?", [req.body.telefono]);
      res.status(200).json({ data: result });
    } catch (error) {
        return res.status(400).json({ message: " [Error] something goes wrong!" });
    }
  };


  export const getUserByEmail = async (email) => {
    try {
      const [result] = await query("SELECT * FROM users WHERE email= ?", [email]);
      if (result.length === 0) {
        return "[Error] something goes wrong"
      }
      console.log(result[0]);
      return result[0];
    } catch (error) {
      console.log("Error something goes wrong" + error);
    }
  };

  export const getAll = async (req, res) => {
    try{
        const [result] = await query("select * from clientes");
        if (result.length === 0){
            return "[Error] something goes wrong"
        }   
        console.log("Si esta trayendo datos")
        res.status(200).json({ data: result });
    } catch (error) {
        console.log("Error something goes wrong" + error);
        return res.status(400).json({ message: " [Error] something goes wrong!" });
    }
  };

  export const getClient = async(req, res) => {
    console.log("Recibienod los datos del req")

    let nombre = req.body.nombre+`%`
    console.log(nombre);

    let telefono = req.body.telefono+`%`
    console.log(telefono);

    if(nombre === null){
        try{
            const [result] = await query("select * from clientes where telefono LIKE ? ", [telefono]);
            if (result.length === 0){
                return "[Error] something goes wrong"
            }   
            console.log("Si esta trayendo datos")
            res.status(200).json({ data: result });
        } catch (error) {
            console.log("Error something goes wrong" + error);
            return res.status(400).json({ message: " [Error] something goes wrong!" });
        }
    }else if(telefono === null){
        try{
            const [result] = await query("select * from clientes where nombre LIKE ? ", [nombre]);
            if (result.length === 0){
                return "[Error] something goes wrong"
            }   
            console.log("Si esta trayendo datos")
            res.status(200).json({ data: result });
        } catch (error) {
            console.log("Error something goes wrong" + error);
            return res.status(400).json({ message: " [Error] something goes wrong!" });
        }
    }else if(nombre === null && telefono === null) {
        return res.status(400).json({ message: " [Error] Ingrese uno de los datos solicitados" });
    }else{
        try{
            const [result] = await query("select * from clientes where telefono LIKE ? AND nombre LIKE ?", [telefono , nombre]);
            if (result.length === 0){
                return "[Error] something goes wrong"
            }   
            console.log("Si esta trayendo datos")
            res.status(200).json({ data: result });
        } catch (error) {
            console.log("Error something goes wrong" + error);
            return res.status(400).json({ message: " [Error] something goes wrong!" });
        }
    }
  }
  
  