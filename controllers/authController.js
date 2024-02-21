import jwt from "jsonwebtoken";
import bcycript from "bcryptjs";
import {createUser,getUserByEmail} from "./usersController.js";
import { config } from "dotenv";

config();

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await createUser(name, email, password);
  res.status(201).json({ message: "Acount created succesfuly!" });
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await getUserByEmail(email);

  if (!userFound) {
    return res.status(400).json({ message: " [Error] something goes wrong!" });
  }

  const matchpassword = await bcycript.compare(password, userFound.password);

  if (!matchpassword) {
    return res.status(401).json({ toke: null, message: "[Error] something goes wrong" });
  }

  const token = jwt.sign({ id: userFound.id },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,{expiresIn: 86400}
  );

   return res
       .cookie("access_token", token, {
         httpOnly: false, 
         sameSite: 'None', 
         maxAge: 3600000, //un ahora de vida de la cookie
         secure: false //esto se va a cambiar cuando se ponga el ssl
       })
       .status(200)
      .json({ message: "Logged in successfully!" });

};

export const logout = (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
  };
