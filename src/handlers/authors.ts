import * as config from '../knexfile';
import * as Knex from "knex";
const instance: Knex = Knex.default(config as Knex.Config);

export class authorController {
    getAuthorById = (authorId: string) => {
        return Promise.resolve(
            instance("authors").select("id", "name", "age")
            .where({ id: parseInt(authorId) }).debug(false)
            .then(rows => {
                return rows[0]
            })
            .catch(error => {
                return error;
            })
        );
    }
    getAuthors = () => {
        let query = instance("authors").select("id", "name", "age")
        return Promise.resolve(
            query.then(rows => {
                return rows
            })
            .catch(error => {
                return error;
            })
        );
    }
    addAuthor = (authorObj:any) => {
        return Promise.resolve(
            instance("authors").insert({
                name: authorObj.name,
                age: authorObj.age
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