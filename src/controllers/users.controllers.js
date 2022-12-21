import connectionDB from "../database/db.js";

export async function SignIn(req, res){
    const {name, email, password, createdAt} = req.body

    try{
        const result = await connectionDB.query(`
            INSERT INTO users (name, email, password, "createdAt")
            VALUES ($1, $2, $3, $4)`,
            [name, email, password, createdAt]);
        res.status(201).send(result)
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function SignUp(req, res){
    
}