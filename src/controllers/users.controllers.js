import connectionDB from "../database/db.js";
import bcrypt from "bcrypt";

export async function SignIn(req, res){
    const {name, email, password, createdAt} = req.body

    try{
        const hashPassword = bcrypt.hashSync(password, 10) //criptografa a senha do usuário

        const result = await connectionDB.query(`
            INSERT INTO users (name, email, password, "createdAt")
            VALUES ($1, $2, $3, $4)`,
            [name, email, hashPassword, createdAt]);
        res.status(201).send(result)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function SignUp(req, res){
    
}