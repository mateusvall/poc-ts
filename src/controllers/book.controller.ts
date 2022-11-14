import { Request, Response } from "express";
import { bookSchema } from "../schemas/schemas.js";
import connection from "../db.js";

export async function getBook(req: Request, res: Response){

    try{
        const { name } = req.query;

        const bookExists = await connection.query('SELECT * FROM books WHERE "name"=$1',[ name ]);
        if(!bookExists){
            return res.sendStatus(400)
        }

        return res.send(bookExists.rows[0]);

    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    } 

    


}

export async function registerBook(req: Request, res: Response){

    const newBook: {
        name: string,
        quantity: string
    } = {
        name: req.body.name,
        quantity: req.body.quantity
    }

    const validation = bookSchema.validate(newBook);

    if (validation.error) {
        return res
            .status(422)
            .send(validation.error.details.map(detail => detail.message));
    }

    const bookExists = await connection.query('SELECT * FROM books WHERE name=$1', [newBook.name]);
    if(!bookExists){
        return res.sendStatus(403)
    }

    await connection.query('INSERT INTO books ("name","quantity") VALUES ($1,$2)', [newBook.name, newBook.quantity]);

    res.sendStatus(200);

}

export async function updateQuantity(req: Request, res: Response){

    const book: {
        name: string,
        quantity: string
    } = {
        name: req.body.name,
        quantity: req.body.quantity
    }

    const bookExists = await connection.query('SELECT * FROM books WHERE name=$1', [book.name]);
    if(!bookExists){
        return res.sendStatus(404)
    }

    await connection.query('UPDATE books SET quantity=$1 WHERE name=$2',[book.quantity, book.name]);

    res.sendStatus(200);

}

export async function deleteBook(req: Request, res: Response){

    const { name } = req.query;

    const bookExists = await connection.query('SELECT * FROM books WHERE name=$1', [name]);
    if(!bookExists){
        return res.sendStatus(404)
    }

    await connection.query('DELETE FROM books WHERE name=$1',[name]);

    res.sendStatus(200);

}