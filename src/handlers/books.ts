
import * as config from '../config/knexfile';
import * as Knex from "knex";
const instance: Knex = Knex.default(config as Knex.Config);

export class bookController {
    getBooks = (authorid:string | undefined = undefined) => {
        let query = instance("books").select("*");
        if (authorid) {
            query.where({ authorid: authorid })
        }
        return Promise.resolve(
            query.then(rows => {
                return rows
            })
            .catch(error => {
                return error;
            })
        );
    }
    getBookById = (bookId:string) => {
        return Promise.resolve(
            instance("books").select("id", "name", "genre", "authorid")
            .where({ id: parseInt(bookId) }).debug(false)
            .then(rows => {
                return rows[0]
            })
            .catch(error => {
                return error;
            })
        );
    }
    addBook = (bookObj:any) => {
        return Promise.resolve(
            instance("books").insert({
                name: bookObj.name,
                genre: bookObj.genre,
                authorid: bookObj.authorId
            })
            .returning('*')
            .then(rows => {
                return rows[0];
            })
            .catch(error => {
                return error;
            })
        )
    }
};