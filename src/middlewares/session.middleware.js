import connectionDB from "../database/db.js";

export async function sessionValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) {
        return res.sendStatus(401);
    }

    try{
        const session = await connectionDB.query(`
            SELECT * FROM sessions WHERE token = $1`, [token]);
        if(session.rowCount == 0){
            return res.sendStatus(401)
        }
        
        const userId = session.rows[0].id  
    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

    res.locals() //enviar userId encontrado
    next();
}