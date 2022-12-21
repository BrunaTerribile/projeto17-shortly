import connectionDB from "../database/db.js"
import { userSchema } from "../models/user.model.js"

export async function userValidation (req, res, next){
    const user = req.body;

    try{
        const userExist = await connectionDB.query(`SELECT * FROM users WHERE email = $1`, [user.email])
        if(userExist.rowCount !== 0){ //verifica se este email já está sendo usado
            return res.status(409).send("Esse email já está cadastrado");
        }

        const { error } = userSchema.validate(user, { abortEarly: false }); //validação joi
        if(error) {
          const errors = error.details.map((detail) => detail.message);
          return res.status(400).send(errors);
        }
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }

    req.user = user;
    next();
}