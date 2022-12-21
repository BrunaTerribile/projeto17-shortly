import connectionDB from "../database/db.js";
import * as bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function SignUp(req, res){
    const {name, email, password, createdAt} = req.body

    try{
        const hashPassword = bcrypt.hashSync(password, 10) //criptografa a senha do usuário

        const result = await connectionDB.query(`
            INSERT INTO users (name, email, password, "createdAt")
            VALUES ($1, $2, $3, $4)`,
            [name, email, hashPassword, createdAt]);
        res.sendStatus(201)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function SignIn(req, res){
    const {email, password} = req.body;
    const token = uuidV4();

    try {
        const userExist = await connectionDB.query(`
            SELECT * FROM users WHERE email = $1`,[email]); //verifica se o email está cadastrado do bd
        if(userExist.rowCount == 0) {
            return res.status(401).send("Email não encontrado")
        }

        const passwordOk = bcrypt.compareSync(password, userExist.rows[0].password); //verifica se a senha foi preenchida corretamente
        if(!passwordOk) {
            return res.sendStatus(401)
        }

    res.send({ token })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}