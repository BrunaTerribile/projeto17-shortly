import connectionDB from "../database/db.js";

export async function sessionValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) {
        return res.sendStatus(401);
    }

    const session = await connectionDB.query(`
        SELECT "userId" FROM sessions WHERE token = $1`, [token]);
    if(session.rowCount == 0){
        return res.sendStatus(404)
    }
        
    const userId = session.rows[0].userId
    req.user = userId//envia userId encontrado
    next();
}