import connectionDB from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortener(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const { url } = req.body;
    const shortUrl = nanoid(10);

    if(!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await connectionDB.query(`
            SELECT * FROM sessions WHERE token = $1`, [token]);
        if(session.rowCount == 0){
            res.sendStatus(401)
        }
        
        const userId = session.rows[0].id  

        const addUrl = await connectionDB.query(`
            INSERT INTO urls (url, "userId", "shortUrl", "visitCount")
            VALUES ($1, $2, $3, $4)`, 
            [url, userId, shortUrl, 0]);

        res.status(201).send({shortUrl})
    } catch (err){
        console.log(err);
        return res.sendStatus(500);
    }

}

export async function getUrl(req, res){

}

export async function goToUrl(req, res){

}

export async function deleteUrl(req, res){

}