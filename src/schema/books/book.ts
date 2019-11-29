import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';
import { authorController } from '../../handlers/authors';
const authorCntrl = new authorController();

export const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        const { AuthorType } = require("../authors/author");
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author: {
                type: AuthorType,
                async resolve(parent, args) {
                    let author = await authorCntrl.getAuthorById(parent.authorid)
                    return author;
                }
            }
    }
    }
})