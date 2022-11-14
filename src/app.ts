import express from "express";
import { deleteBook, getBook, registerBook, updateQuantity } from "./controllers/book.controller.js";

const server = express();

server.use(express.json());

server.get('/health', (req, res) =>{
    res.send('ok');
})

server.get('/book', getBook);
server.post('/book', registerBook);
server.put('/book', updateQuantity);
server.delete('/book', deleteBook);

server.listen(4000, () => {
    console.log('Magic is happening at port 4000')
})