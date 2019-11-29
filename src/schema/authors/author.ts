import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} from 'graphql';
import { bookController } from '../../handlers/books';
const bookCntrl = new bookController();

export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => {
        const { BookType } = require("../books/book");
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            books: {
                type: new GraphQLList(BookType),
                async resolve(parent, args) {
                    return await bookCntrl.getBooks(parent.id)
                }
            }
        }
    }

})