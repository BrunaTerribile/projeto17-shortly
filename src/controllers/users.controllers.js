import connectionDB from "../database/db.js";
import * as bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function SignUp(req, res){
    const {name, email, password} = res.locals.user

    try{
        const hashPassword = bcrypt.hashSync(password, 10) //criptografa a senha do usuário

        const result = await connectionDB.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`,
            [name, email, hashPassword]);
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

        const userId = userExist.rows[0].id

        const addSession = connectionDB.query(`
            INSERT INTO sessions (token, "userId")
            VALUES ($1, $2)`, [token, userId]
        );

    res.send(token).status(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getUserUrls(req, res){
    const userId = req.user;

    try {
        const result = await connectionDB.query(`
        SELECT u.id, u.name, CAST(SUM(r."visitCount") AS int) AS "visitCount",
        json_agg(json_build_object('id', r.id, 'shortUrl', r."shortUrl", 'url', r.url, 'visitCount', r."visitCount")::jsonb) AS "shortenedUrls"
        FROM users AS u
        JOIN urls AS r
        ON r."userId" = u.id
        WHERE u.id = $1
        GROUP BY u.id`, [userId]);

        res.send(result.rows).status(200)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getRanking(req, res){
    try {
        const ranking = await connectionDB.query(`
            SELECT u.id, u.name, 
            COUNT(r."userId") as "linksCount", 
            SUM(r."visitCount") as "visitCount"
            FROM users AS u
            LEFT JOIN urls AS r
            ON r."userId" = u.id
            GROUP BY u.id
            ORDER BY "visitCount" DESC
            LIMIT 10`)

        res.send(ranking.rows).status(200)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}