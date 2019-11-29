import graphql, { GraphQLInt, GraphQLNonNull } from "graphql";
import { bookController } from '../handlers/books';
const bookCntrl = new bookController();
import { authorController } from '../handlers/authors';
const authorCntrl = new authorController();
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} from 'graphql';

const BookType:any = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
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
    })
})

const AuthorType:any = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return await bookCntrl.getBooks(parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                // code to get data from db/other source
                return await authorCntrl.getAuthorById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args) {
                return await authorCntrl.getAuthors()
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return await bookCntrl.getBooks()
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                // code to get data from db/other source
                return await bookCntrl.getBookById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parent, args) {
                let name = args.name,
                    age = args.age,
                    author = { name, age }
                return await authorCntrl.addAuthor(author);
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                let name = args.name,
                    genre = args.genre,
                    authorId = args.authorId,
                    book = { name, genre, authorId }
                return await bookCntrl.addBook(book);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})