import connectionDB from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortener(req, res){
    //recebe userId do middleware:
    const userId = req.user;
    const { url } = req.body;
    const shortUrl = nanoid(10);

    try {
        const addUrl = await connectionDB.query(`
            INSERT INTO urls ("userId", url, "shortUrl", "visitCount")
            VALUES ($1, $2, $3, $4)`, 
            [userId, url, shortUrl, 0]);

        res.status(201).send({shortUrl})
    } catch (err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getUrl(req, res){
    const id = req.params.id

    try {
        const urlExist = await connectionDB.query(`
            SELECT id, "shortUrl", url 
            FROM urls WHERE id = $1`, [id]);
        if(urlExist.rowCount == 0){
            return res.sendStatus(404)
        }

        res.status(200).send(urlExist.rows[0])
    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function goToUrl(req, res){
    const shortUrl = req.params.shortUrl

    try {
        const findUrl = await connectionDB.query(`
            SELECT id, url, "visitCount" 
            FROM urls 
            WHERE "shortUrl" = $1`, [shortUrl]);
        if(findUrl.rowCount == 0){
            return res.sendStatus(404)
        }

        const urlData = findUrl.rows[0]
        const visitCount = (urlData.visitCount) + 1

        const addVisit = await connectionDB.query(`
            UPDATE urls 
            SET "visitCount" = $1
            WHERE id = $2`, 
            [visitCount, urlData.id]);

        res.redirect(urlData.url)
    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res){
    //receber userId do middleware
    const userId = req.user;
    const urlId = req.params.id;

    try {
        const isUserUrl = await connectionDB.query(`
            SELECT * FROM urls 
            WHERE "userId" = $1 AND id = $2`,
            [userId, urlId]);
        if(isUserUrl.rowCount == 0){
            return res.sendStatus(401)
        }

        const result = await connectionDB.query(`
            DELETE FROM urls WHERE id = $1`, [urlId]);

        res.sendStatus(204)
    } catch (err){
        console.log(err);
        return res.sendStatus(500);
    }
}